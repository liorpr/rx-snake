const functions = require('firebase-functions');
const admin = require('firebase-admin');
const R = require('ramda');

admin.initializeApp(functions.config().firebase);

function move({ point, direction, width, height }) {
  const moveWrap = R.pipe(
    R.mergeWith(R.add),
    R.evolve({
      x: x => (x + width) % width,
      y: y => (y + height) % height,
    })
  );

  return moveWrap(point, direction);
}

function detectCollision(snake) {
  return snake.slice(1).some(x => R.equals(snake[0], x));
}

exports.move = functions.https.onRequest((req, res) => {
  const { x, y, player } = req.query;

  if ([x, y, player].includes(undefined)) {
    res.sendStatus(400);
    return;
  }

  const playerData = admin.database().ref(`players/${player}`).once('value');
  const game = admin.database().ref('game').once('value');

  Promise.all([playerData, game]).then(([playerData, game]) => {
    let { snake, score, state } = playerData.val();
    const { candy, width, height } = game.val();

    if (state === 'ended') {
      res.status(400).send('Game Ended');
      return;
    }

    let updateCandy = false;

    const nextPoint = move({
      point: snake[0],
      direction: { x, y },
      width,
      height,
    });

    snake = R.prepend(nextPoint, snake);
    state = 'running';

    if (R.equals(nextPoint, candy)) {
      snake = R.adjust(R.assoc('belly', true), 0, snake);
      updateCandy = true;
      score = score + 1;
    } else {
      snake = R.dropLast(1, snake);
    }

    if (detectCollision(snake)) {
      state = 'ended';
    }

    const newPlayerData = { snake, state, score };
    const promises = [admin.database().ref(`players/${player}`).set(newPlayerData)];

    if (updateCandy) {
      promises.push(admin.database().ref('game/candy').set({
        x: ~~(Math.random() * width),
        y: ~~(Math.random() * height),
      }));
    }

    return Promise.all(promises).then(() => res.send(newPlayerData));
  })
});

exports.start = functions.https.onRequest((req, res) => {
  admin.database().ref('game').once('value')
    .then(x => x.val())
    .then(({width, height}) => admin.database().ref('players')
      .push({
        score: 0,
        state: 'loaded',
        snake: R.repeat({x: ~~(width/2), y: ~~(height/2)}, 5),
      })
      .then(snapshot => res.status(200).send(snapshot.key))
    );
});
