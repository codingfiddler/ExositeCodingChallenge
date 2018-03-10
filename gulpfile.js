var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});

gulp.task('start', function () {
    nodemon({
        script: 'src/bin/www'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});