import React from 'react';
import ReactDOM from 'react-dom';
import TrialsLayout from './trials-layout';

ReactDOM.render(
  <TrialsLayout statsUrl={STATS_URL} pollSeconds={10} />,
  document.getElementById('trials-layout')
)
