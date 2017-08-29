import React from 'react';
import firebase from 'firebase';
import { mapPropsStream, createEventHandler, compose, setDisplayName } from 'recompose';
import R from 'ramda';
import { Observable } from 'rxjs';
import GameState from "./Game/utils/GameState";
import Snake from './Snake/index';
import './utils/initFirebase';

const playersRef = firebase.database()
  .ref('game/players')
  .orderByChild('state')
  .equalTo(GameState.running);

const Players = ({ players, colors, ...props }) => (
  <div>
    {
      Object.entries(players).map(([key, { snake, direction }], index) => (
        <Snake key={key} color={colors[index % colors.length]} shape={snake} direction={direction} {...props} />
      ))
    }
  </div>
);

export default compose(
  setDisplayName('Players'),
  mapPropsStream(props$ => {
    const { handler: onPlayers, stream: onPlayers$ } = createEventHandler();

    playersRef.on('value', onPlayers);

    const sharedProps$ = props$.share();

    const players$ = onPlayers$
      .map(x => x.exists() ? x.val() : {})
      .withLatestFrom(sharedProps$.pluck('current'), (players, current) => {
        const now = ~~((new Date()).getTime() / 1000);
        return R.pickBy((player, key) => key !== current && now - player.updated < 15, players)
      })
      .startWith({});

    return Observable.combineLatest(sharedProps$, players$)
      .map(([props, players]) => ({
        ...props,
        players,
      }))
      .finally(() => playersRef.off('value', onPlayers));
  }))(Players);
