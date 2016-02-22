import React from 'react';
import classNames from 'classnames';
import PieChart from './piechart';
import colors from './colors';
import Color from 'color';

class Trial extends React.Component {
  static propTypes = {
    trial: React.PropTypes.shape({
      name: React.PropTypes.string,
      state: React.PropTypes.string,
      slug: React.PropTypes.string,
      age: React.PropTypes.number,
      agents_count: React.PropTypes.number,
      pipelines_count: React.PropTypes.number,
      invites_count: React.PropTypes.number,
      builds_count: React.PropTypes.number,
    }).isRequired
  };

  render() {
    return (
      <div className={classNames("Trial", `Trial--state-${this.props.trial.state}`)} title={this.props.trial.name}>
        <div style={{ position:'absolute', top:0, left:0, width: '100%', height: '100%', zIndex: 2 }}>
          {this._chartLabel(this.props.trial.agents_count, {top:-5, left:'calc(50% - 1.25em)', borderColor: this._agentsColor(), color: this._agentsColor()}, 'Agents')}
          {this._chartLabel(this.props.trial.builds_count, {top:'55%', left:-2, borderColor: this._buildsColor(), color: this._buildsColor()}, 'Ran a Passing Build')}
          {this._chartLabel(this.props.trial.invites_count, {top:'55%', right:-2, borderColor: this._membersColor(), color: this._membersColor()}, 'Invites')}
        </div>
        <div style={{ position:'absolute', top:0, left:0, zIndex: 1, width: '100%', height: '100%', transform: 'rotate(210deg)' }}>
          <PieChart
            data={ this._chartData() }
            sectorStrokeColor={colors.background}
            viewBoxWidth={85}
            sectorStrokeWidth={1} />
        </div>
        <div className="Trial__name">
          <span>{this.props.trial.name}</span>
        </div>
        <div className="Trial__age" style={{ color: this._idColor() }}>{this.props.trial.age}d</div>
      </div>
    )
  }

  _chartData() {
    return [
      {value: 100, color: this._agentsColor()},
      {value: 100, color: this._membersColor()},
      {value: 100, color: this._buildsColor()}
    ]
  }

  _color(activeColor, isActive) {
    if (this.props.trial.state == 'active') {
      return isActive ? colors.gold : colors.darkGold
    } else if (this.props.trial.state == 'trial_expired') {
      return isActive ? Color(activeColor).darken(0.75).hexString() : colors.inactive;
    } else {
      return isActive ? activeColor : colors.inactive;
    }
  }

  _idColor() {
    if (this.props.trial.state == 'trial_expired')
      return '#444'
    else
      return '#aaa'
  }

  _agentsColor() {
    return this._color(colors.agents, this.props.trial.agents_count > 0);
  }

  _membersColor() {
    return this._color(colors.members, this.props.trial.invites_count > 0);
  }

  _buildsColor() {
    return this._color(colors.builds, this.props.trial.builds_count > 0);
  }

  _chartLabel(number, style, title) {
    if (number > 0) {
      return (
        <span className="Trial__chart-label" style={style} title={title}>{number}</span>
      )
    }
  }
}


export default Trial;