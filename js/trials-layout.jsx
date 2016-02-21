import React from 'react';
import Trial from './trial.jsx';
import colors from './colors';

class TrialsLayout extends React.Component {
  static propTypes = {
    trials: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="TrialsLayout">
        <h1 className="TrialsLayout">
          {this.props.trials.length}
          {" "}
          Active Trials
        </h1>
        <div className="Trials__legend">
          <p style={{color: colors.agents}}><span className="Trials__legend-dot" style={{backgroundColor: colors.agents}}></span> Connected Agent</p>
          <p style={{color: colors.members}}><span className="Trials__legend-dot" style={{backgroundColor: colors.members}}></span> Invited Member</p>
          <p style={{color: colors.builds}}><span className="Trials__legend-dot" style={{backgroundColor: colors.builds}}></span> Ran a Build</p>
        </div>
        <div className="Trials">
          {this.props.trials.map(function(trial) {
            return <Trial key={trial.slug} trial={trial} />
          })}
        </div>
      </div>
    )
  }
};

export default TrialsLayout;