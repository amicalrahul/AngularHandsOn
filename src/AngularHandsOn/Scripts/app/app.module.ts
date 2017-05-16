import './rxjs-extensions';
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
import { AuthService } from './shared/auth.service';
import { UserModule } from './user/user.module';
import { TOASTR_TOKEN, Toastr } from './shared/toastr.service'
declare let toastr: Toastr
@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, ProductModule, SchoolAppModule, UserModule, AppRoutingModule],
    declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent, ComposeMessageComponent, CustomerComponent],
    bootstrap: [AppComponent],
    providers: [AuthService,
        { provide: TOASTR_TOKEN, useValue: toastr }]
})
export class AppModule { }
