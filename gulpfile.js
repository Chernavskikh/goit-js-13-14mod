var gulp = require('gulp');
var babel = require('gulp-babel');
 
gulp.task('default', () => {
	return gulp.src('js/script.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});