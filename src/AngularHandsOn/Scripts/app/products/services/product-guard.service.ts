
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductBasicInfoComponent } from '../productedit/basicinfo.component';

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductBasicInfoComponent> {
    canDeactivate(component: ProductBasicInfoComponent): boolean {
        return true;
    }
}