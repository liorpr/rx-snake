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
