var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: './dist'
		}
	});
});

gulp.task('dist', function(){
	gulp.src('./web_client/**/*')
	.pipe(gulp.dest('dist'))
	.pipe(reload({stream:true}));
});

gulp.task('watch', function(){
	gulp.watch('./web_client/**/*', ['dist']);
});


gulp.task('default',['dist','browser-sync','watch']);
