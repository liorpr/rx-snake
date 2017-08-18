const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const R = require('ramda');
const Point = require('./Point');

exports.moveSnake = functions.database.ref('game/players/{playerId}/next')
  .onWrite(event => {
    if (!event.data.exists()) return;

    const playerRef = event.data.ref.parent;
    const gameRef = playerRef.parent.parent;
    const candyRef = gameRef.child('candy');

    return gameRef.child('size').once('value')
      .then(x => x.val())
      .then(({ width, height }) => {
        const next = Point.from(event.data.val()).wrap(width, height);

        return playerRef.once('value')
          .then(snapshot => {
            let { state, snake, score } = snapshot.val();
            if (state === 'ended') return;

            if (snake.some(x => next.equals(x))) {
              state = 'ended';
            } else {
              state = 'running';
            }
            snake = R.prepend(next, snake);

            return candyRef.once('value')
              .then(snapshot => {
                const candy = snapshot.val();
                if (!next.equals(candy)) return false;

                return candyRef.set(Point.random(width, height))
                  .then(() => true);
              })
              .then(eat => {
                if (eat) {
                  snake = R.adjust(p => Point.from(p).withBelly(), 0, snake);
                  score++;
                } else {
                  snake = snake.slice(0, -1);
                }
                return snapshot.ref.update({ state, snake, score });
              });
          });
      });
  });
