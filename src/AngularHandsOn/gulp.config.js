module.exports = function () {
    var ang2Code = 'Scripts/**/';

    var config = {

        angular2Lib:[
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ],
        angular2Code: [
            '*.html',
            '*.css',
            '*.jpg'
        ],
        scriptsTs: ang2Code + '*.ts',
        bookappjs: ['./wwwroot/js/common/services/*.js']

    };

    return config;
}