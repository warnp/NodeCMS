var gulp = require('gulp');
var sass = require('gulp-sass');
var 	    autoprefixer = require('gulp-autoprefixer');
var 	    minifycss = require('gulp-minify-css');
var 	        rename = require('gulp-rename');
var tinylr  ;
var jshint = require('gulp-jshint');
//var combiner = require('stream_combiner2');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var csslint = require("gulp-csslint");

gulp.task('default',['watch', 'scripts', 'styles' ],function(){
		//var combined = combiner.obj([
		////gulp.src('')
	//])
});

gulp.task('styles',function(){
	return gulp.src('sass/*.scss')
            .pipe(sass())
			    //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
			//.pipe(minifycss())
			.pipe(csslint())
			.pipe(csslint.reporter())
	        	.pipe(gulp.dest('public/stylesheets'));
			
			    //.pipe(rename({suffix: '.min'}))
			//.pipe(minifycss())
			//.pipe(gulp.dest('css'));

});

gulp.task('watch',['browserSync'],function(){
	gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('src/scripts/*.js', ['jshint', 'scripts']);
});

gulp.task('livereload',function(){
	tinylr =require('tiny-lr');
	tinylr().listen( 35729  );
});

gulp.task('jshint',function(){
	return gulp.src('src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts',function(){
	return gulp.src('src/scripts/*.js')
		//.pipe(uglify())
		.pipe(rename(function(path){
				path.basename = path.basename.replace(".js",".min.js");
			}
		))
		.pipe(gulp.dest('public/javascripts'));
});

gulp.task('browserSync',function(){
	browserSync.init(["public/stylesheets/*.css", "public/javascripts/*.js","views/**/*.jade"],{
		//dynamic server
		proxy: 'blog.assie.io'
		//static server
		//server: {
			//baseDir: "./"
		//}
	});
	
});
