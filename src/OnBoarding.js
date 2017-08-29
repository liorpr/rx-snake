import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setName } from "./store/reducer";

const OnBoarding = ({name, setName, push}) => (
  <div>
    <label>What is your good name?</label>
    <input value={name} onChange={e => setName(e.target.value)}/>
    <button onClick={() => push('/play')}>Game on!</button>
  </div>
);

export default connect(state => state, { setName, push })(OnBoarding);
