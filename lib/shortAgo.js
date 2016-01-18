'use strict'
import moment, { duration, isDate, isMoment } from 'moment'

export default function shortAgo (date, now = new Date()) {
  if (!isDate(date) && !isMoment(date)) {
    date = new Date(date)
  }

  let diff = duration(moment(now).diff(date))
  let sign = ''
  if (diff < 0) {
    sign = '+'
    diff = duration(-diff)
  }

  if (diff < duration(1, 'minute')) {
    return `${sign}${diff.seconds()}s`
  }

  if (diff < duration(1, 'hour')) {
    return `${sign}${diff.minutes()}m`
  }

  if (diff < duration(1, 'day')) {
    return `${sign}${diff.hours()}h`
  }

  return `${sign}${Math.round(diff.asDays())}d`
}
