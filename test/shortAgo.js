'use strict'
import { test } from 'tap'
import shortAgo from '../lib/shortAgo'
import moment from 'moment'

test('shortAgo', (t) => {
  t.plan(400)

  const cases = [
    ['seconds', 's', 60],
    ['minutes', 'm', 60],
    ['hours', 'h', 24],
    ['days', 'd', 10000]
  ]

  for (let c of cases) {
    const [ unit, u, range ] = c
    for (let n of Array(100).fill(0)) {
      n = Math.round(Math.random() * (range - 2)) + 1
      const now = moment()
      const then = now.clone().subtract(n, unit)
      t.equal(shortAgo(then, now), `${n}${u}`)
    }
  }
})

test('shortAgo in the future', (t) => {
  t.plan(400)

  const cases = [
    ['seconds', 's', 60],
    ['minutes', 'm', 60],
    ['hours', 'h', 24],
    ['days', 'd', 10000]
  ]

  for (let c of cases) {
    const [ unit, u, range ] = c
    for (let n of Array(100).fill(0)) {
      n = Math.round(Math.random() * (range - 2)) + 1
      const now = moment()
      const then = now.clone().add(n, unit)
      t.equal(shortAgo(then, now), `+${n}${u}`)
    }
  }
})
