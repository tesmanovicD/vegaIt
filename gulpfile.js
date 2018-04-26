const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const jsonminify = require("gulp-jsonminify");
const autoprefixer = require("gulp-autoprefixer");

// Copy html files
gulp.task("copyHTML", function() {
  gulp.src("src/*.html")
      .pipe(gulp.dest("dist"))
});

// Minify js
gulp.task("minify", function() {
  gulp.src("src/js/*.js")
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"))
});

//Minify JSON
gulp.task("jsonminify", function() {
  gulp.src("src/storage/*.json")
      .pipe(jsonminify())
      .pipe(gulp.dest("dist/storage"))
});

// Compile sass and autoprefix if needed
gulp.task("sass", function() {
  gulp.src("src/sass/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest("dist/css"))
});

// Optimize image size
gulp.task("imagemin", function() {
  gulp.src("src/img/*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"))
});

gulp.task("default", ["sass", "minify", "imagemin", "jsonminify", "copyHTML"]);

gulp.task("watch", function() {
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/js/*.js", ["minify"]);
  gulp.watch("src/storage/*.json", ["jsonminify"]);
  gulp.watch("src/img/*", ["imagemin"]);
  gulp.watch("src/*.html", ["copyHTML"]);
})
