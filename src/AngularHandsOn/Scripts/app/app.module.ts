import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { ProductModule } from './products/product.module';

import { SchoolAppModule } from './schoolapp/schoolapp.module';
import { WelcomeComponent } from './home/welcome.component';
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ProductModule, SchoolAppModule,
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
        ],
            { useHash: true }
        )],
    declarations: [AppComponent, WelcomeComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
