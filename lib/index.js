'use strict'
import React, { PropTypes } from 'react'
import shortAgo from './shortAgo'

export { shortAgo }
export default class Time extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      display: this.props.format(this.props.dateTime)
    }
  }

  static get propTypes () {
    return {
      dateTime: PropTypes.instanceOf(Date).isRequired,
      format: PropTypes.func,
      interval: PropTypes.number
    }
  }

  static get defaultProps () {
    return {
      format: shortAgo,
      interval: 1000
    }
  }

  tick () {
    this.setState({
      display: this.state.format(this.props.dateTime)
    })
  }

  componentDidMount () {
    this.interval = setInterval(this.tick.bind(this), this.props.interval)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const iso = this.props.dateTime.toISOString()
    return <time dateTime={iso} title={iso}>{this.state.display}</time>
  }
}
