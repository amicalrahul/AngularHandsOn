import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditViewComponent } from './productedit/edit-view.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'products', component: ProductListComponent },
        {
            path: 'products/:id',
            component: ProductDetailComponent
        },
        {
            path: 'productedit',
            loadChildren: 'app/products/productedit/productedit.module#ProductEditModule'
        }
    ])],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}