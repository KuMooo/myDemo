var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var htmlclean = require('gulp-htmlclean');
var uglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");

var devMode = process.env.NODE_ENV == "development";


var folder = {
    src: "./src/",
    build: "./build/"
}


gulp.task("img", function () {
    gulp.src(folder.src + "img/*")
        .pipe(newer(folder.build + "img"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + "img"))
})


gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
    if (!devMode) {
        page.pipe(htmlclean())
    }

    page.pipe(gulp.dest(folder.build + "html"))
})


gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload());
    if (!devMode) {
        page.pipe(stripDebug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.build + "js"))
})

gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()]
    var page = gulp.src(folder.src + "css/*")
    .pipe(less())
    .pipe(connect.reload());
    if (!devMode) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.build + "css"))
})

gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "img/*", ["img"]);
    gulp.watch(folder.src + "js/*", ["js"]);
})

gulp.task("server",function() {
    connect.server({
        port:""//端口lik,
    })
})

gulp.task("default", ["html", "img", "js", "css", "watch","server"])  