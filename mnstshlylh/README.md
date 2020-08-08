# gulp-bugsnag-mnstshlylh

[![mnstshlylh](https://travis-ci.org/bugsnag/gulp-bugsnag.svg?branch=master)](https://travis-ci.org/bugsnag/gulp-bugsnag)
[![NPM](https://img.shields.io/npm/v/gulp-bugsnag.svg)](https://npmjs.org/package/gulp-bugsnag)

Gulp plugins for common Bugsnag actions.

## Installation

```
npm install --save-dev gulp-bugsnag
```

## Plugins

```js
const { reportBuild } = require('gulp-bugsnag')
```

### `reportBuild(build, opts): stream`

Reports your application's build to Bugsnag. It can auto detect source control from `.git`, `.hg` and `package.json`.
This plugin should go at the end of the task where you build your application – however it operates as a passthrough stream, so you can place things downstream of it if you like.

Once it has received the last item in the stream, the plugin will report the build to Bugsnag. If something upstream errors the build report will not get sent.

- `build` describes the build you are reporting to Bugsnag
  - `apiKey: string` your Bugsnag API key __[required]__
  - `appVersion: string` the version of the application you are building __[required]__
  - `releaseStage: string` `'production'`, `'staging'` etc. (leave blank if this build can be released to different `releaseStage`s)
  - `sourceControl: object` an object describing the source control of the build (if not specified, the module will attempt to detect source control information from `.git`, `.hg` and the nearest `package.json`)
    - `provider: string` can be one of: `'github'`, `'github-enterprise'`, `'gitlab'`, `'gitlab-onpremise'`, `'bitbucket'`, `'bitbucket-server'`
    - `repository: string` a URL (`git`/`ssh`/`https`) pointing to the repository, or webpage representing the repository
    - `revision: string` the unique identifier for the commit (e.g. git SHA)
  - `builderName: string` the name of the person/machine that created this build (defaults to the result of the `whoami` command)
  - `autoAssignRelease: boolean` automatically associate this build with any new error events and sessions that are received for the `releaseStage` until a subsequent build notification is received. If this is set to `true` and no `releaseStage` is provided the build will be applied to `'production'`.
- `opts`
  - `logLevel: string` the minimum severity of log to output (`'debug'`, `'info'`, `'warn'`, `'error'`), default `'warn'`
  - `logger: object` provide a different logger object `{ debug, info, warn, error }`
  - `path: string` the path to search for source control info, defaults to `process.cwd()`
  - `endpoint: string` post the build payload to a URL other than the default (`https://build.bugsnag.com`)

#### Usage

```js
/* gulpfile.js */

const gulp = require('gulp')
const concat = require('gulp-concat')
const { reportBuild } = require('gulp-bugsnag')

gulp.task('build', () => {
  gulp.src('src/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'))
    .pipe(reportBuild({
      apiKey: 'YOUR_API_KEY',
      appVersion: '1.2.3'
    }))
})

// $ gulp build
// runs your build process and then notifies Bugsnag if the task succeeds
```

## Support

- [Search open and closed issues](https://github.com/bugsnag/gulp-bugsnag/issues?q=is%3Aissue) issues for similar problems
- [Report a bug or request a feature](https://github.com/bugsnag/gulp-bugsnag/issues/new)
- Email [support@bugsnag.com](mailto:support@bugsnag.com)

## Contributing

All contributors are welcome! See our [contributing guide](CONTRIBUTING.md).

## License

This module is free software released under the MIT License. See [LICENSE.txt](LICENSE.txt) for details.
