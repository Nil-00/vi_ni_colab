var gulp = require('gulp');
var webpack = require('webpack-stream');
var del = require('del');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;



var paths = {
  images: 'site/img/**/*',
  html: 'site/*.html',
  sass: 'site/css/**/*.scss',
  script: 'site/bundle.min.js'
};

// watch files for changes and reload
gulp.task('sync', function() {
  browserSync({
    server: {
      baseDir: 'site'
    }
  });
  gulp.watch(['css/**/*.css', 'js/**/*.js'], {cwd: 'site'}, ['bundle']);
  gulp.watch(['*.js','*.html'], {cwd: 'site'}, reload);
  // gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'site'}, reload);
});

gulp.task('bundle', function() {
  return gulp.src('site/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('site/'))
    .pipe(browserSync.stream());
    
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

// Copy all static images
gulp.task('images',['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('html',['clean'], function() {
  return gulp.src(paths.html)
    // Pass in options to the task
    .pipe(gulp.dest('dist'));
});

gulp.task('script',['clean'], function() {
  return gulp.src(paths.script)
    // Pass in options to the task
    .pipe(gulp.dest('dist'));
});


 
gulp.task('sass',['clean'], function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('site/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['sass']);
});


// Rerun the task when a file changes
// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

// The default task (called when you run `gulp` from cli)
// gulp.task('default', ['images']);
gulp.task('serve', ['sass','bundle','sass:watch','sync']);
gulp.task('build', ['clean','images','html','script','sass' ]);