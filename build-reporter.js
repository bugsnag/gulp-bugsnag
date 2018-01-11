const reportBuild = require('bugsnag-build-reporter')
const through = require('through2')

module.exports = (build, opts) => {
  const _build = Object.assign({ buildTool: 'gulp-bugsnag' }, build)
  const _opts = Object.assign({ logLevel: 'warn' }, opts)
  const stream = through.obj({}, null, (cb) => {
    reportBuild(_build, _opts)
      .then(cb)
      .catch(err => {
        // this error needs be reported in the next tick
        // because within the callstack of the promise it
        // gets re-emited at an unhandled rejection
        process.nextTick(() => cb(err))
      })
  })
  return stream
}
