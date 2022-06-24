const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

gulp.task("styles", function () {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(
            cleanCSS({
                level: 2,
            })
        )
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    browserSync.init({
        server: {
            port: 3000,
            baseDir: "./build/",
        },
    });
    gulp.watch(
        [
            "./src/scss/*.scss",
            "./src/scss/base/*.scss",
            "./src/scss/sections/*.scss",
        ],
        gulp.series("styles")
    );
    gulp.watch("./build/*.html").on("change", browserSync.reload);
});

gulp.task("build", gulp.series("styles"));

gulp.task("dev", gulp.series("build", "watch"));
