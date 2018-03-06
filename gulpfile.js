var gulp = require('gulp'), // подключение gulp
	sass = require('gulp-sass'), // подключение компилятора sass
	browserSync = require('browser-sync'), // автообновление браузера
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('src/sass/**/*.scss') // Берем источник. Все файды .sass из папки и подпапок
        .pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Префиксы браузерные
        .pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // автообновление браузера
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('start', ['browser-sync', 'sass'], function() {  // Реал тайм обновление
    gulp.watch('src/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами
    gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
});