// TODO: what kind of optimization can I do with the templates? inline them in the js?
// TODO: should I actually NOT concatenate/minify the data files? this would require the other devs to run the build script when updating any data file...
// TODO: add some actual tests for the runner to run

var projectName = 'hackathon-portal',

    TESTS_SRC = 'src/**/*_test.js',
    DATA_WEB_EXAMPLES_TESTS_SRC = 'data/examples/web/**/*_test.js',

    SCRIPTS_SRC = ['src/**/*.js', '!' + TESTS_SRC],
    STYLES_GLOB_SRC = 'src/**/*.scss',
    STYLES_MAIN_SRC = 'src/common/main.scss',
    IMAGES_SRC = 'src/images/**/*',
    TEMPLATES_SRC = 'src/**/*.html',
    FONTS_SRC = 'src/fonts/**/*',

    DATA_ALL_SRC = 'data/**/*.json',
    DATA_SPECIFICATIONS_SRC = 'data/specifications/**/*.json',
    DATA_WEB_EXAMPLES_SRC = ['data/examples/web/**/*.js', '!' + DATA_WEB_EXAMPLES_TESTS_SRC],

    DIST = 'dist',
    SCRIPTS_DIST = DIST + '/scripts',
    STYLES_DIST = DIST + '/styles',
    IMAGES_DIST = DIST + '/images',
    TEMPLATES_DIST = DIST + '/templates',
    FONTS_DIST = DIST + '/fonts',
    DATA_DIST = DIST + '/data',

    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(SCRIPTS_SRC)
      .pipe(plugins.plumber())
      .pipe(plugins.concat(projectName + '.js'))
      .pipe(gulp.dest(SCRIPTS_DIST))
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify())
      .pipe(gulp.dest(SCRIPTS_DIST))
      .pipe(plugins.notify({message: 'scripts task complete'}));
});

gulp.task('styles', function () {
  return gulp.src(STYLES_MAIN_SRC)
      .pipe(plugins.plumber())
      .pipe(plugins.sass())// {sourceComments: 'map'}
      .pipe(plugins.autoprefixer('last 2 version'))
      .pipe(gulp.dest(STYLES_DIST))
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(STYLES_DIST))
      .pipe(plugins.notify({message: 'styles task complete'}));
});

gulp.task('images', function () {
  return gulp.src(IMAGES_SRC)
      .pipe(plugins.plumber())
    //.pipe(plugins.cache(plugins.imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))// TODO: add image compression?
      .pipe(gulp.dest(IMAGES_DIST))
      .pipe(plugins.notify({message: 'images task complete'}));
});

gulp.task('templates', function () {
  return gulp.src(TEMPLATES_SRC)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(TEMPLATES_DIST))
      .pipe(plugins.notify({message: 'templates task complete'}));
});

gulp.task('fonts', function () {
  return gulp.src(FONTS_SRC)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(FONTS_DIST))
      .pipe(plugins.notify({message: 'fonts task complete'}));
});

gulp.task('data', ['data-specifications', 'data-web-examples']);

gulp.task('data-specifications', function () {
  return gulp.src(DATA_SPECIFICATIONS_SRC)
      .pipe(plugins.plumber())
      .pipe(plugins.jsoncombine('specifications.json', function (data) {
        var key, i, array;
        i = 0;
        array = [];
        for (key in data) {
          array[i++] = data[key];
        }
        return new Buffer(JSON.stringify(array));
      }))
      .pipe(gulp.dest(DATA_DIST))
      .pipe(plugins.notify({message: 'data-specifications task complete'}));
});

gulp.task('data-web-examples', function () {
  return gulp.src(DATA_WEB_EXAMPLES_SRC)
      .pipe(plugins.plumber())
      .pipe(plugins.concat('web-examples.js'))
      .pipe(gulp.dest(DATA_DIST))
      .pipe(plugins.notify({message: 'data-web-examples task complete'}));
});

gulp.task('web-examples-tests-once', function () {
  return gulp.src(DATA_WEB_EXAMPLES_TESTS_SRC, {read: false})
      .pipe(plugins.plumber())
      .pipe(plugins.mocha({reporter: 'dot', ui: 'tdd'}));
});

gulp.task('tests-once', function () {
  return gulp.src(TESTS_SRC)
      .pipe(plugins.plumber())
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'run'}));
});

gulp.task('tests-tdd', function () {
  return gulp.src(TESTS_SRC)
      .pipe(plugins.plumber())
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'watch'}));
});

gulp.task('bump', function () {
  return gulp.src(['./bower.json', './package.json'])
      .pipe(plugins.bump({type: 'patch'})) // 'major'|'minor'|'patch'|'prerelease'
      .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
  return gulp.src(DIST, {read: false})
      .pipe(plugins.clean());
});

gulp.task('server', function () {
  require('./server/server');
});

gulp.task('watch', function () {
  plugins.livereload.listen();

  gulp.watch(STYLES_GLOB_SRC, ['styles']);
  gulp.watch(SCRIPTS_SRC, ['scripts']);
  gulp.watch(TEMPLATES_SRC, ['templates']);
  gulp.watch(FONTS_SRC, ['fonts']);
  gulp.watch(DATA_ALL_SRC, ['data']);
  gulp.watch(IMAGES_SRC, ['images']);

  gulp.watch(DIST + '/**/*').on('change', plugins.livereload.changed);
});

gulp.task('default', ['clean'], function () {
  gulp.start('tests-once', 'web-examples-tests-once', 'styles', 'scripts', 'images', 'templates',
      'fonts', 'data', 'server', 'watch');
});
