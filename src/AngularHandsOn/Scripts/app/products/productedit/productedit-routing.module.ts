import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductEditViewComponent } from './edit-view.component';
import { ProductBasicInfoComponent } from './basicinfo.component';
import { ProductPriceDetailComponent } from './pricedetail.component';
import { ProductSearchTagsComponent } from './searchtags.component';

const editRoutes: Routes = [
    {
        path: '',
        component: ProductEditViewComponent,
        children: [
            {
                path: ':id/info',
                component: ProductBasicInfoComponent
            },
            {
                path: ':id/price',
                component: ProductPriceDetailComponent
            },
            {
                path: ':id/tags',
                component: ProductSearchTagsComponent
            },
            {
                path: '',
                component: ProductBasicInfoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(editRoutes)],
    exports: [RouterModule],
    providers: []
})
export class ProductEditRoutingModule {
}