var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var responsive = require('gulp-responsive');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');  // Source maps are files that associate line numbers from the processed file to the original. 

gulp.task('styles', function(done){
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'));
	done();
});


gulp.task('scripts-dist', function(done){
	gulp.src('js/**/*.js')
	.pipe(babel({
		presets: ['env']
}))
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))  // change script address in HTML to all.js  !!!
		.pipe(uglify().on('error', function(e){
			console.log(e);
	 }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/js'));
		done();
});


gulp.task('images', function (done) {
	return gulp.src('img/prueba/*.{jpg,tif}')
		.pipe(responsive({
			'*.tif': [{
				width: 900,
				rename: {
					suffix: '-900px',
					extname: '.jpg',
				},
				format: 'jpeg',
			}, {
				width: 600,
				rename: {
					suffix: '-600px',
					extname: '.jpg',
				},
				// format option can be omitted because
				// format of output image is detected from new filename
				// format: 'jpeg'
			}, {
				width: 1900,
				rename: {
					suffix: '-1900px',
					extname: '.jpg',
				},
				// Do not enlarge the output image if the input image are already less than the required dimensions.
				withoutEnlargement: true,
			}, {
				// Convert images to the webp format
				width: 630,
				rename: {
					suffix: '-630px',
					extname: '.webp',
				},
			}],
			'*.jpg': [{
        width: 200,
        rename: { suffix: '-200px' },
      }, {
        width: 500,
        rename: { suffix: '-500px' },
      }, {
        width: 630,
        rename: { suffix: '-630px' },
      }, {
        // Compress, strip metadata, and rename original image
        rename: { suffix: '-original' },
      }],
		}, {
			// Global configuration for all images
			// The output quality for JPEG, WebP and TIFF output formats
			quality: 80,
			// Use progressive (interlace) scan for JPEG and PNG output
			progressive: true,
			// Strip all metadata
			withMetadata: false,
			// Do not emit the error when image is enlarged.
			errorOnEnlargement: false,
		}))
		.pipe(gulp.dest('./images3'));
		done();
});

gulp.watch('sass/**/*.scss', gulp.series('styles')); 
