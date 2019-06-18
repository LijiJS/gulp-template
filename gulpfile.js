var gulp = require('gulp');
var less = require('gulp-less');
var smushit = require('gulp-smushit');
var uglify = require('gulp-uglify');
var uglifyCSS = require('gulp-minify-css');

gulp.task('html', function(){
    return gulp.src('dev/*.html')
        .pipe(gulp.dest('build'))
});

gulp.task('toCSS', function(){
    return gulp.src('dev/styles/notCompiled/*')
        .pipe(less())
        .pipe(gulp.dest('dev/styles'))
});

gulp.task('styles', function(){
    return gulp.src('dev/styles/*.css')
        .pipe(uglifyCSS())
        .pipe(gulp.dest('build/styles'))
});

gulp.task('scripts', function() {
    return gulp.src('dev/scripts/*')
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('images', function(){
    return gulp.src('dev/images/*')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('build/images'))
});

gulp.task('watch', function(){
    gulp.watch('dev/styles/notCompiled/*', gulp.series('toCSS'));
});

//dev
gulp.task('dev', gulp.parallel('toCSS', 'watch'));

//build
gulp.task('build', gulp.parallel('html', 'styles', 'scripts', 'images'));
