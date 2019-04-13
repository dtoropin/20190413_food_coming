'use strict';
// gulp 4

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	gcmq = require('gulp-group-css-media-queries'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	notify = require('gulp-notify'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
			html: 'build/',
			js: 'build/js/',
			css: 'build/css/',
			img: 'build/img/',
			fonts: 'build/fonts/'
	},
	src: {
			html: 'app/*.html',
			js: 'app/js/*.js',
			style: 'app/sass/*.sass',
			img: 'app/img/**/*.*',
			fonts: 'app/fonts/**/*.*'
	},
	watch: {
			html: 'app/*.html',
			js: 'app/js/*.js',
			style: 'app/sass/**/*.sass',
			img: 'app/img/**/*.*',
			fonts: 'app/fonts/**/*.*'
	},
	clean: './build'
};

var config = {
	server: {
			baseDir: "./build"
	},
	host: 'localhost',
	port: 9000,
	browser: ['chrome']
};

// html
gulp.task('html:build', function () {
	return gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

// js
gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

// styles
gulp.task('style:build', function () {
	return gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
		.pipe(prefixer())
		.pipe(gcmq())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

// images
gulp.task('image:build', function () {
	return gulp.src(path.src.img)
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()],
				interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

// fonts
gulp.task('fonts:build', function() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({stream: true}));
});

// build
gulp.task('build', gulp.parallel('html:build', 'js:build', 'style:build', 'image:build', 'fonts:build'));

// watch
gulp.task('watch', function(){
	watch([path.watch.html], gulp.series('html:build'));
	watch([path.watch.style], gulp.series('style:build'));
	watch([path.watch.js], gulp.series('js:build'));
	watch([path.watch.img], gulp.series('image:build'));
	watch([path.watch.fonts], gulp.series('fonts:build'));
});

// server
gulp.task('webserver', function () {
	browserSync(config);
});

// clean
gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

// default task
gulp.task('default', gulp.series('clean', 'build', gulp.parallel('webserver', 'watch')));