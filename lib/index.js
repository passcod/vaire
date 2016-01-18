'use strict'
import React, { PropTypes } from 'react'
import shortAgo from './shortAgo'

export default class Time extends React.Component {
  constructor (props) {
    super(props)
    const date = new Date(this.props.dateTime)

    let format = this.props.format
    if (format === 'short') { format = shortAgo }

    this.state = {
      date: date,
      display: format(date),
      format: format,
      iso: date.toISOString()
    }

    this.tick = this.tick.bind(this)
  }

  static get propTypes () {
    return {
      dateTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
      ]).isRequired,
      format: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ])
    }
  }

  static get defaultProps () {
    return { format: 'short' }
  }

  tick () {
    this.setState({
      display: this.state.format(this.state.date)
    })
  }

  componentDidMount () {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <time dateTime={this.state.iso} title={this.state.iso}>
        {this.state.display}
      </time>
    )
  }
}
