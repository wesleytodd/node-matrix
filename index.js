'use strict'
const fs = require('fs').promises
const core = require('@actions/core')
const exec = require('@actions/exec')
const versions = require('@pkgjs/nv')

// most @actions toolkit packages have async methods
async function run () {
  try {
    const aliases = core.getInput('versions')
    core.debug(aliases)
    const v = await versions(aliases.split(',').map((s) => s.trim()))
    core.debug(v)

    const verStr = v.map((v) => v.version).join(', ')

    await exec.exec('./create_branch.sh')
    await fs.writeFile('.github/workflows/tmp-test.yml', `
name: Test
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [${verStr}]
    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: \${{ matrix.node-version }}
    - name: npm install and test
      run: npm it
    `)

    await exec.exec('git', ['status'])
    await exec.exec('git', ['diff'])
    await exec.exec('./commit_push.sh', [`"${verStr}"`])
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
