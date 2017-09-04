const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.topScores = functions.database.ref('game/snakes/{snakeId}/score')
  .onUpdate(event => {
    const snakeRef = event.data.ref.parent;
    const playersRef = snakeRef.parent.parent.child('players');
    const score = event.data.val();

    return snakeRef.child('playerId').once('value')
      .then(x => x.val())
      .then(playerId => {
        const scoreRef = playersRef.child(playerId).child('score');
        return scoreRef.once('value')
          .then(x => x.exists() ? x.val() : 0)
          .then(topScore => {
            if (score > topScore) {
              return scoreRef.set(score);
            }
          });
      });
  });

exports.candyValidation = functions.database.ref('game/config')
  .onUpdate(event => {
    const { candy, size } = event.data.val();
    if (candy.x > size.width || candy.x < 0 || candy.y > size.height || candy.y < 0) {
      return event.data.ref.child('candy').set({
        x: Math.abs(candy.x % size.width),
        y: Math.abs(candy.y % size.height),
      });
    }
  });
