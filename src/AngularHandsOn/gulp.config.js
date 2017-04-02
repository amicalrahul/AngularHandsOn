module.exports = function () {
    var ang2Code = 'Scripts/**/';
    var client = './wwwroot/'
    var clientApp =  client + 'js/';
    var scriptLoc = 'views/shared/';

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
        bookappjs: [clientApp + 'common/services/*.js'],
        scriptLoc: scriptLoc,
        index: scriptLoc + '_Scripts.cshtml',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/app.js',
            clientApp + '**/*.services.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
            '!' + clientApp + '**/*.min.js'
        ],
        css: client + 'css/bootstrap.cerulean.min.css',
        /**
        * Bower locations
        */
        bower: {
            json: require('./bower.json'),
            directory: client + 'lib',
            ignorePath: '../..'
        }

    };
    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
}