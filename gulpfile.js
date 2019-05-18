var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');

gulp.task('test', function() {
	console.log('Gulp is working');
});

gulp.task('browserSync', function() {
	browserSync.init({
		proxy: 'http://localhost:8888/record_collection/'
	});
});

gulp.task('sass', function() {
	return gulp.src('sass/styles.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream:true
	}))
});

gulp.task('minify-css', ()=> {
	return gulp.src('dist/css/styles.css')
	.pipe(cleanCSS({debug:true}, function(details) {
		console.log(details.name + ': '+ details.stats.originalSize);
		console.log(details.name + ': '+ details.stats.minifiedSize);
	}))
	.pipe(gulp.dest('dist/css/'))
});

gulp.task('compress', function() {
	gulp.src(['js/**/*.js'])
	.pipe(minify({
		ext: {
			min: '.min.js'
		},
		noSource: true
	}))
	.pipe(gulp.dest('dist/js/'))
})

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('dist/css/styes.css', ['minify-css']);
	gulp.watch('*.php', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
})