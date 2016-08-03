'use strict'
import React, { PropTypes } from 'react'
import shortAgo from './shortAgo'

export { shortAgo }
export default class Time extends React.Component {
  constructor (props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.state = {
      display: this.props.format(this.props.dateTime)
    }
  }

  static get propTypes () {
    return {
      dateTime: PropTypes.instanceOf(Date).isRequired,
      format: PropTypes.func,
      interval: PropTypes.number,
      raw: PropTypes.boolean
    }
  }

  static get defaultProps () {
    return {
      format: shortAgo,
      interval: 1000,
      raw: false
    }
  }

  tick () {
    this.setState({
      display: this.props.format(this.props.dateTime)
    })
  }

  componentDidMount () {
    this.interval = setInterval(this.tick, this.props.interval)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  componentWillReceiveProps () {
    this.tick() // Immediately update, don't wait for interval
  }

  render () {
    const iso = this.props.dateTime.toISOString()
    return this.props.raw
      ? this.state.display
      : <time dateTime={iso} title={iso}>{this.state.display}</time>
  }
}
