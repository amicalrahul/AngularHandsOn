module.exports = function () {
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

        bookappjs: ['./wwwroot/js/common/services/*.js']

    };

    return config;
}