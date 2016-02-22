import React from 'react';
import ReactDOM from 'react-dom';
import TrialsLayout from './trials-layout';

fetch('data.json').then(function(response) {
  response.json().then(function(json) {
    ReactDOM.render(
      <TrialsLayout trials={json.trials}/>,
      document.getElementById('trials-layout')
    )
  })
})
