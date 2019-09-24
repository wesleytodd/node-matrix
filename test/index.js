'use strict'
const { suite, test } = require('mocha')
const nodeVersionMatrix = require('../versions')

suite('node matrix', () => {
  test('...', async () => {
    const versions = await nodeVersionMatrix()
    console.log(versions)
  })
})
