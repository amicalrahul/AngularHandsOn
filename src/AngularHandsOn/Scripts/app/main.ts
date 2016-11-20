/// <reference path="../../typings/globals/core-js/index.d.ts" />
/// <reference path="../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />
// main entry point
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
