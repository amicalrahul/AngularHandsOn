import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { ProductModule } from './products/product.module';

import { SchoolAppModule } from './schoolapp/schoolapp.module';
import { WelcomeComponent } from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found.component';
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ProductModule, SchoolAppModule, AppRoutingModule],
    declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
