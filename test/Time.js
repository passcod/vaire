'use strict'
import { test } from 'tap'
import React from 'react'
import Time from '../lib/index'
import shortAgo from '../lib/shortAgo'
import { duration } from 'moment'
import { createRenderer as shallower } from 'react-addons-test-utils'

test('Time', (t) => {
  t.plan(300)

  function testRender (dt, cb) {
    const shallow = shallower()
    shallow.render(<Time dateTime={dt} />)
    cb(shallow.getRenderOutput())
  }

  for (let n of Array(100).fill(0)) {
    // Generate a date between 2 years in the past and 2 years in the future
    const now = +new Date()
    n = now + (Math.random() * duration(4, 'years')) - duration(2, 'years')
    n = Math.abs(now - n) < 10e5 ? now + Math.abs(now - n) * 2 : n // No small values
    const date = new Date(n)
    const ago = shortAgo(date)

    t.ok(!isNaN(date.getDate()), 'Date is valid') // Sanity check

    testRender(date, (output) => {
      t.equal(output.type, 'time')
      t.deepEqual(output.props, {
        children: ago,
        dateTime: date.toISOString(),
        title: date.toISOString()
      })
    })
  }
})
