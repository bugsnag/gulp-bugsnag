# gulp-bugsnag

### Example

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
```
