import React from 'react';
import { Link } from 'react-router-dom'

const OnBoarding = () => (
  <div>
    <label>What is your good name?</label>
    <input/>
    <Link to="/play">Game on!</Link>
  </div>
);

export default OnBoarding;
