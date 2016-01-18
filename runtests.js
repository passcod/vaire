#!/usr/bin/env node
'use strict'
process.execPath = require.resolve('babel-cli/bin/babel-node.js')
require('tap/bin/run')
