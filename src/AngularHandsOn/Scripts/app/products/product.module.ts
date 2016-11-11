import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ProductListComponent } from './product-list.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ProductListComponent, ProductFilterPipe],
    imports: [SharedModule, RouterModule.forChild([
        { path: 'products', component: ProductListComponent }
    ])],
    providers: [ProductService]
    
})
export class ProductModule {
}