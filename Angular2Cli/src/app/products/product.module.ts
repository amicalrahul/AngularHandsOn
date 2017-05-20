import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list.component';
import { ProductFilterPipe } from './filters/product-filter.pipe';
import { ProductService } from 'app/products/services/product.service';

@NgModule({
  imports: [
   FormsModule, CommonModule,
    ProductRoutingModule
  ],
  declarations: [ProductListComponent, ProductFilterPipe],
    providers: [ProductService]
})
export class ProductModule { }
