import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductBasicInfoComponent } from './basicinfo.component';
import { ProductPriceDetailComponent } from './pricedetail.component';
import { ProductSearchTagsComponent } from './searchtags.component';
import { ProductEditRoutingModule } from './productedit-routing.module'

import { ProductEditViewComponent } from './edit-view.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule, ProductEditRoutingModule
    ],
    declarations: [ProductBasicInfoComponent,
        ProductPriceDetailComponent, ProductSearchTagsComponent, ProductEditViewComponent
    ],
    providers: [
    ]
})
export class ProductEditModule { }