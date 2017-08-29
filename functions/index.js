const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.topScores = functions.database.ref('game/players/{playerId}/score')
  .onUpdate(event => {
    const playerRef = event.data.ref.parent;
    const topScoreRef = playerRef.parent.parent.child('topScores');
    const score = event.data.val();

    return playerRef.child('playerId').once('value')
      .then(x => x.val())
      .then(playerId => {
        const scoreRef = topScoreRef.child(playerId);
        return scoreRef.once('value')
          .then(x => x.exists() ? x.val() : 0)
          .then(topScore => {
            if (score > topScore) {
              return scoreRef.set(score);
            }
          });
      });
  });
