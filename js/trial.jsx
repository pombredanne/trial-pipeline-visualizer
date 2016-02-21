import React from 'react';
import PieChart from './piechart.jsx';
import colors from './colors';

class Trial extends React.Component {
  static propTypes = {
    trial: React.PropTypes.shape({
      name: React.PropTypes.string,
      slug: React.PropTypes.string,
      agent_count: React.PropTypes.number,
      agent_connected_count: React.PropTypes.number,
      agents_os: React.PropTypes.arrayOf(React.PropTypes.string),
      pipeline_count: React.PropTypes.number,
      member_count: React.PropTypes.number,
      build_count: React.PropTypes.number,
      first_member: React.PropTypes.shape({
        name: React.PropTypes.string,
        email: React.PropTypes.string
      })
    }).isRequired
  };

  render() {
    let classNames = "Trial " + (this.props.trial.agent_count != 0 ? "Trial--agents" : "")

    return (
      <div className={classNames} title={this.props.trial.name}>
        <div style={{ position:'absolute', top:0, left:0, width: '100%', height: '100%', zIndex: 2 }}>
          {this._chartLabel(this.props.trial.agent_count, 0, {top:-2, left:'calc(50% - 1.25em)', borderColor: colors.agents, color: colors.agents}, 'Agents')}
          {this._chartLabel(this.props.trial.member_count, 1, {top:'60%', right:'.25em', borderColor: colors.members, color: colors.members}, 'Members')}
          {this._chartLabel(this.props.trial.build_count, 0, {top:'60%', left:'.25em', borderColor: colors.builds, color: colors.builds}, 'Builds')}
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
        <div className="Trial__id">{this.props.trial.id}</div>
      </div>
    )
  }

  _chartData() {
    const inactive = colors.inactive;
    return [
      {value: 100, color: (this.props.trial.agent_count > 0 ? colors.agents : inactive ) },
      {value: 100, color: (this.props.trial.member_count > 1 ? colors.members : inactive) },
      {value: 100, color: (this.props.trial.build_count > 0 ? colors.builds : inactive) }
    ]
  }

  _chartLabel(number, showIfGreaterThan, style, title) {
    if (number > showIfGreaterThan) {
      return (
        <span className="Trial__chart-label" style={style} title={title}>{number}</span>
      )
    }
  }
}


export default Trial;