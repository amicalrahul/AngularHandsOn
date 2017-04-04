module.exports = function () {
    var ang2Code = 'Scripts/**/';
    var client = './wwwroot/';
    var clientApp = client + 'js/';
    var clientLib = client + 'lib/';
    var report = './report/';
    var scriptLoc = 'views/shared/';
    var specRunnerFile = 'specs.html';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({ devDependencies: true })['js'];

    var config = {

        angular2Lib: [
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
        bookappjs: [clientApp + 'common/services/*.js'],
        client: client,
        css: client + 'css/bootstrap.cerulean.min.css',
        index: scriptLoc + '_GulpGeneratedScripts.cshtml',
        js: [
            client + 'lib/ui-bootstrap-tpls-0.11.0.js',
            clientApp + '**/*.module.js',
            clientApp + '**/app.js',
            clientApp + '**/*.services.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
            '!' + clientApp + '**/*.min.js'
        ],
        report: report,
        scriptLoc: scriptLoc,
        scriptsTs: ang2Code + '*.ts',
        /**
        * Bower locations
        */
        bower: {
            json: require('./bower.json'),
            directory: client + 'lib',
            ignorePath: 'wwwroot/'
        },
        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        nodeTestlibraries: [
           'mocha/**/*.*',
           'chai/**/*.*',
           'mocha-clean/**/*.*',
           'sinon-chai/**/*.*'
        ],
        testlibraries: [
           clientLib + 'mocha/mocha.js',
           clientLib + 'chai/chai.js',
           clientLib + 'mocha-clean/index.js',
           clientLib + 'sinon-chai/lib/sinon-chai.js'
        ],
        specs: [clientApp + '**/*.spec.js'],

        /**
         * Karma and testing settings
         */
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],
        
        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'
    };
    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };
    config.getInjectOptions = function () {
        var options = {
            ignorePath: config.bower.ignorePath
        };

        return options;
    };
    config.karma = getKarmaOptions();
    return config;
    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                clientApp + '**/*.module.js',
                clientApp + '**/app.js',
                clientApp + '**/*.services.js',
                clientApp + '**/*.js',
                //temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};