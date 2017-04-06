import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { ProductModule } from './products/product.module';

import { SchoolAppModule } from './schoolapp/schoolapp.module';
import { WelcomeComponent } from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found.component';
import { ComposeMessageComponent } from './compose-message.component';
import { CustomerComponent } from './customersignup/customer.component';
import { AuthService } from "./shared/auth.service";
import { LoginComponent } from "./login.component";
@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, ProductModule, SchoolAppModule, AppRoutingModule],
    declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent, ComposeMessageComponent, CustomerComponent, LoginComponent],
    bootstrap: [AppComponent],
    providers: [AuthService]
})
export class AppModule { }
