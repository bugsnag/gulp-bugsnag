const gulp = require('gulp')
const concat = require('gulp-concat')
const reportBuild = require('../../../').reportBuild

gulp.task('build', () => {
  gulp.src('src/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'))
    .pipe(reportBuild({
      apiKey: 'YOUR_API_KEY',
      appVersion: '1.2.3'
    }, { endpoint: `http://localhost:${process.env.PORT}` }))
})
