import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { DataService } from './schoolapp/services/data.service';
import { AllSchoolsResolve } from './schoolapp/allschools.resolve';
import { AuthService } from './shared/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: '../../app/app.component.html'
})
export class AppComponent { 
    pageTitle: string = `Acme Product Management`;

    constructor(public authService: AuthService) {
    }

    logout() {
        this.authService.logout();
    }
}
