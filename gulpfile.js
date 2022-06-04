const gulp = require('gulp'); // Название пакетов/зависимостей внутри require такое же как в package.json
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const newer = require('gulp-newer');
const browserSync = require('browser-sync');

// Пути для плагинов
const paths = {
	styles: {
		src: ['src/styles/**/*.scss', 'src/styles/**/*.sass'],
		dest: 'dist/css/'
	},
	scripts: {
		src: 'src/js/**/*.js',
		dest: 'dist/js'
	},
	images: {
		src: 'src/img/**/*',
		dest: 'dist/img'
	},
	icons: {
		src: 'src/icons/**/*',
		dest: 'dist/icons'
	},
	html: {
		src: 'src/*.html',
		dest: 'dist/'
	},
	fonts: {
		src: 'src/fonts/*',
		dest: 'dist/fonts'
	}
};
// Минификация, префиксы, карты
function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(rename(
			{
				basename: 'style',
				suffix: '.min'
			}
		))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream());
}

// Скрипты
function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('script.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());
}

function img() {
	return gulp.src(paths.images.src)
		.pipe(newer(paths.images.dest))
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5
		}))
		.pipe(gulp.dest(paths.images.dest))
}

function icons() {
	return gulp.src(paths.icons.src)
		.pipe(newer(paths.icons.dest))
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5
		}))
		.pipe(gulp.dest(paths.icons.dest))
}

function html() {
	return gulp.src(paths.html.src)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(paths.html.dest))
		.pipe(browserSync.stream());
}

function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
	gulp.watch(paths.html.src).on('change', browserSync.reload);
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.images.src, img);
	gulp.watch(paths.fonts.src, fonts);
	gulp.watch(paths.icons.src, icons);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series( html, gulp.parallel(styles, scripts, img, icons, fonts), watch); // Последовательное выполнение задач, внутри параллельное

exports.html = html;
exports.img = img;
exports.icons = icons;
exports.fonts = fonts;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
