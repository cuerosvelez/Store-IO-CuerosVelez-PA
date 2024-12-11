/* eslint-disable @typescript-eslint/no-var-requires */

const gulp = require("gulp");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass(dartSass);
const glob = require("glob");
const concat = require("gulp-concat");

const PATHS = {
  SCSS: {
    ALL: "./react/components/**/*.scss",
  },
};

let sassPaths = [];

function getFiles(done) {
  glob(PATHS.SCSS.ALL, function (er, files) {
    sassPaths = files;
  });

  done();
}

function tranformScssInCss(done) {
  sassPaths.forEach((path) => {
    gulp
      .src(
        [
          "../shared-styles/_vars.scss",
          "../shared-styles/_mixin.scss",
          "../shared-styles/_animations.scss",
          path,
        ],
        { base: "." }
      )
      .pipe(concat(path))
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("."));
  });

  done();
}

function watch() {
  gulp.watch(PATHS.SCSS.ALL, { ignoreInitial: false }, tranformScssInCss);
}

exports["kit-core"] = gulp.series(getFiles, watch);
