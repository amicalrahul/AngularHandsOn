import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { DataService } from './schoolapp/services/data.service';

@Component({
    selector: 'pm-app',
    template: `
         <div><h1>{{pageTitle}}</h1>
        <pm-products></pm-products>
        <pm-school></pm-school>
    </div>
    `,
    providers: [ProductService, DataService]
})
export class AppComponent { 
    pageTitle: string = `Acme Product Management`;
}
