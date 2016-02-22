import React from 'react';
import Trial from './trial';
import colors from './colors';

class TrialsLayout extends React.Component {
  static propTypes = {
    accounts: React.PropTypes.array.isRequired
  };

  componentWillMount() {
    console.log("Will mount")
  }

  render() {
    return (
      <div className="TrialsLayout">
        <h1 className="TrialsLayout">
          {this._trialCount()}
          {" "}
          Active Trials
        </h1>
        <div className="Trials__legend">
          <p style={{color: colors.agents}}><span className="Trials__legend-dot" style={{backgroundColor: colors.agents}}></span> Connected Agent</p>
          <p style={{color: colors.members}}><span className="Trials__legend-dot" style={{backgroundColor: colors.members}}></span> Invited Member</p>
          <p style={{color: colors.builds}}><span className="Trials__legend-dot" style={{backgroundColor: colors.builds}}></span> Ran a Build</p>
        </div>
        <div className="Trials">
          {this.props.accounts.map(function(account) {
            return <Trial key={account.slug} trial={account} />
          })}
        </div>
      </div>
    )
  }

  _trialCount() {
    return this.props.accounts.filter((a) => a.state == "trial").length
  }
};

export default TrialsLayout;