// TODO: what kind of optimization can I do with the templates? inline them in the js?
// TODO: should I actually NOT concatenate/minify the data files? this would require the other devs to run the build script when updating any data file...
// TODO: add some actual tests for the runner to run

var projectName = 'hackathon-portal',

    rootPath = '/hackathon-portal',
    //rootPath = '',

    testsSrc = 'src/**/*_test.js',
    dataWebExamplesTestsSrc = 'data/examples/web/**/*_test.js',

    scriptsSrc = ['src/**/*.js', '!' + testsSrc],
    stylesGlobSrc = 'src/**/*.scss',
    stylesMainSrc = 'src/common/main.scss',
    imagesSrc = 'res/images/**/*',
    templatesSrc = 'src/**/*.html',
    fontsSrc = 'res/fonts/**/*',
    ejsSrc = 'src/index.ejs',

    dataAllSrc = 'data/**/*.json',
    dataSpecificationsSrc = 'data/specifications/**/*.json',
    dataWebExamplesSrc = ['data/examples/web/**/*.js', '!' + dataWebExamplesTestsSrc],

    dist = 'dist',
    scriptsDist = dist + '/scripts',
    stylesDist = dist + '/styles',
    imagesDist = dist + '/images',
    templatesDist = dist + '/templates',
    fontsDist = dist + '/fonts',
    ejsDist = './',
    dataDist = dist + '/data',

    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(scriptsSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.concat(projectName + '.js'))
      .pipe(gulp.dest(scriptsDist))
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify())
      .pipe(gulp.dest(scriptsDist));
});

gulp.task('styles', function () {
  return gulp.src(stylesMainSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.sass())// {sourceComments: 'map'}
      .pipe(plugins.autoprefixer('last 2 version'))
      .pipe(gulp.dest(stylesDist))
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(stylesDist));
});

gulp.task('images', function () {
  return gulp.src(imagesSrc)
      .pipe(plugins.plumber())
    //.pipe(plugins.cache(plugins.imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))// TODO: add image compression?
      .pipe(gulp.dest(imagesDist));
});

gulp.task('templates', function () {
  return gulp.src(templatesSrc)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(templatesDist));
});

gulp.task('fonts', function () {
  return gulp.src(fontsSrc)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(fontsDist));
});

gulp.task('ejs', function () {
  return gulp.src(ejsSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.ejs({
        rootPath: rootPath
      }))
      .pipe(gulp.dest(ejsDist));
});

gulp.task('data', ['data-specifications', 'data-web-examples']);

gulp.task('data-specifications', function () {
  return gulp.src(dataSpecificationsSrc)
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
      .pipe(gulp.dest(dataDist));
});

gulp.task('data-web-examples', function () {
  return gulp.src(dataWebExamplesSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.concat('web-examples.js'))
      .pipe(gulp.dest(dataDist));
});

gulp.task('web-examples-tests-once', function () {
  return gulp.src(dataWebExamplesTestsSrc, {read: false})
      .pipe(plugins.plumber())
      .pipe(plugins.mocha({reporter: 'dot', ui: 'tdd'}));
});

gulp.task('tests-once', function () {
  return gulp.src(testsSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'run'}));
});

gulp.task('tests-tdd', function () {
  return gulp.src(testsSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'watch'}));
});

gulp.task('bump', function () {
  return gulp.src(['./bower.json', './package.json'])
      .pipe(plugins.bump({type: 'patch'})) // 'major'|'minor'|'patch'|'prerelease'
      .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
  return gulp.src(dist, {read: false})
      .pipe(plugins.clean());
});

gulp.task('server', function () {
  require('./server/server');
});

gulp.task('watch', function () {
//  plugins.livereload.listen();

  gulp.watch(stylesGlobSrc, ['styles']);
  gulp.watch(scriptsSrc, ['scripts']);
  gulp.watch(templatesSrc, ['templates']);
  gulp.watch(fontsSrc, ['fonts']);
  gulp.watch(dataAllSrc, ['data']);
  gulp.watch(imagesSrc, ['images']);
  gulp.watch(ejsSrc, ['ejs']);

//  gulp.watch(dist + '/**/*').on('change', plugins.livereload.changed);
});

gulp.task('default', ['clean'], function () {
  gulp.start('web-examples-tests-once', 'styles', 'scripts', 'images', 'templates', 'fonts',
      'ejs', 'data', 'server', 'watch');//, 'tests-once');
});
