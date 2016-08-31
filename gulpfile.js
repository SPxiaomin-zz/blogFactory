/* jshint node:true */

var gulp = require('gulp');

var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');

var jade = require('gulp-jade');

var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');


var paths = {
    jade: ['./views/**/*.jade', '!./views/{layout*,error}.jade'],
    css: ['./public/stylesheets/src/**/*.less'],
    js: ['./public/javascript/src/**/*.js']
};


gulp.task('jade', function() {
    var htmlDest = './views/html';
    var stream = gulp.src(paths.jade)
        .pipe(plumber({
            errorHandler: notify.onError('Message:\n\t<%= error.message %>\nDetails:\n\tlineNumber: <%= error.lineNumber %>')
        }))
        .pipe(jade({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest(htmlDest))
        .pipe(livereload())

    return stream;
});


gulp.task('css', function() {
    var cssDest = './public/stylesheets/dest';
    var stream = gulp.src('./public/stylesheets/src/test.less')
        .pipe(plumber({
            errorHandler: notify.onError('Message:\n\t<%= error.message %>\nDetails:\n\tlineNumber: <%= error.lineNumber %>')
        }))
        .pipe(less())
        .pipe(gulp.dest(cssDest))
        .pipe(minifyCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(livereload())

    return stream;
});

var condition;

gulp.task('js', function() {
    var jsDest = './public/javascript/dest';
    var stream = gulp.src(paths.js)
        .pipe(plumber({
            errorHandler: notify.onError('Message:\n\t<%= error.message %>\nDetails:\n\tlineNumber: <%= error.lineNumber %>')
        }))
        .pipe(jshint())
        .pipe(notify(function(file) {
            if ( file.jshint.success ) {
                return false;
            }

            var errors = file.jshint.results.map(function(data) {
                if ( data.error ) {
                    return 'line ' + data.error.line + ', col ' + data.error.character + ', ' + data.error.reason;
                }
            }).join('\n');
            return file.relative + ' (' + file.jshint.results.length +  ' errors)\n' + errors;
        }))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(jsDest))
        .pipe(livereload())

    return stream;
});



function watcherCallBack(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', task runnning...');
}

gulp.task('default', ['jade', 'css', 'js'], function() {
    livereload.listen();

    var watcherJade = gulp.watch(paths.jade, ['jade']);
    watcherJade.on('change', watcherCallBack);

    var watcherCss = gulp.watch(paths.css, ['css']);
    watcherCss.on('change', watcherCallBack);

    var watcherJs = gulp.watch(paths.js, ['js']);
    watcherJs.on('change', watcherCallBack);
});
