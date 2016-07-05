import React from 'react';
import Trial from './trial';
import colors from './colors';

// window.fetch for older browsers
import 'isomorphic-fetch';

class TrialsLayout extends React.Component {
  static propTypes = {
    accountsUrl: React.PropTypes.string.isRequired,
    pollSeconds: React.PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      fetched: false
    };
  }

  componentWillMount() {
    this.fetchStats();
    this.fetchInterval = setInterval((() => this.fetchStats()), this.props.pollSeconds * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  fetchStats() {
    fetch(this.props.accountsUrl).then((response) => {
      response.json().then((json) => {
        this.setState({
          // Filter out accounts that haven't done anything
          accounts: json.accounts.filter((a) => a.agents_count > 0 || a.invites_count > 0 || a.builds_count > 0),
          fetched: true
        });
      })
    })
  }

  render() {
    return (
      <div className="TrialsLayout">
        <h1 className="TrialsLayout">
          {this._heading()}
        </h1>
        <div className="Trials__legend">
          <p style={{color: colors.agents}}><span className="Trials__legend-dot" style={{backgroundColor: colors.agents}}></span> Connected an Agent</p>
          <p style={{color: colors.builds}}><span className="Trials__legend-dot" style={{backgroundColor: colors.builds}}></span> Ran a Passing Build</p>
          <p style={{color: colors.members}}><span className="Trials__legend-dot" style={{backgroundColor: colors.members}}></span> Invited a Team Member</p>
        </div>
        <div className="Trials">
          {this.state.accounts.map(function(account) {
            return <Trial key={account.slug} trial={account} />
          })}
        </div>
      </div>
    )
  }

  _heading() {
    if (this.state.fetched) {
      return (
        <span>
          {`${this._trialCount()} Trialling`}
          <span style={{ color:'#666' }}>{" / "}</span>
          {`${this._upgradeCount()} Upgraded`}
          <span style={{ color:'#666' }}>{" / "}</span>
          {`${this._expiredCount()} Expired`}
        </span>
      )
    } else {
      return (
        <span>Loading…</span>
      )
    }
  }

  _trialCount() {
    return this.state.accounts.filter((a) => a.state == "trial").length
  }

  _upgradeCount() {
    return this.state.accounts.filter((a) => a.state == "active").length
  }

  _expiredCount() {
    return this.state.accounts.filter((a) => a.state == "trial_expired").length
  }
};

export default TrialsLayout;