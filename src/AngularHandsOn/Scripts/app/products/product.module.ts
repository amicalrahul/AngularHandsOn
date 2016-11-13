import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ProductListComponent } from './product-list.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
    declarations: [ProductListComponent, ProductFilterPipe, ProductDetailComponent],
    imports: [SharedModule, ProductRoutingModule],
    providers: [ProductService]
    
})
export class ProductModule {
}