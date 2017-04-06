import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { DataService } from './schoolapp/services/data.service';
import { AllSchoolsResolve } from './schoolapp/allschools.resolve';

@Component({
    selector: 'pm-app',
    template: `
<nav class="navbar navbar-inverse">
        <div class="container">
            <a class="navbar-brand"
               ui-sref="home">Acme Product Management</a>
            <div class="navbar-header">
                <button type="button"
                        class="navbar-toggle"
                        data-toggle="collapse"
                        data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
    <div class="navbar-collapse collapse">
        <ul class='nav navbar-nav'>
        <li><a [routerLink]="['/welcome']">Home</a></li>
        <li><a [routerLink]="['/products']">Product List</a></li>
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">School App <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><a [routerLink]="['/schoolapphome']">School Home</a></li>
                <li><a [routerLink]="['/allschools']">Schools</a></li>
                <li><a [routerLink]="['/allclassrooms']">Classrooms</a></li>
                <li><a [routerLink]="['/activities']">Activities</a></li>
            </ul>
        </li>
        <li><a [routerLink]="[{outlets: { popup: ['compose']}}]">Contact</a></li>
        <li><a [routerLink]="['/signup']">Sign Up</a></li>
        <li><a [routerLink]="['/login']">Login</a></li>
        </ul>
    </div>
        </div>
    </nav>
        <router-outlet></router-outlet>
        <router-outlet name="popup"></router-outlet>
    `
})
export class AppComponent { 
    pageTitle: string = `Acme Product Management`;
}
