'use strict'

const test = require('tape')
const exec = require('child_process').exec
const http = require('http')

test('gulp-bugsnag: bugsnagReportBuild', t => {
  const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', (d) => { body += d })
    req.on('end', () => {
      res.end('ok')
      let j
      try {
        j = JSON.parse(body)
      } catch (e) {
        server.close()
        t.fail('failed to parse body as json')
      }
      t.ok(j, 'json body was received')
      t.equal(j.appVersion, '1.2.3', 'body should contain app version')
      t.equal(j.apiKey, 'YOUR_API_KEY', 'body should contain api key')
      t.equal(j.buildTool, 'gulp-bugsnag', 'buildTool should be set')
    })
  })
  server.listen()
  exec(`${__dirname}/../node_modules/.bin/gulp build`, {
    cwd: `${__dirname}/fixtures/a`,
    env: Object.assign({}, process.env, { PORT: server.address().port })
  }, (err, stdout) => {
    server.close()
    // console.log(err, stdout)
    t.ok(!err)
    t.end()
  })
})
