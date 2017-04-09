import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../app/products/product.service';

import { IProduct } from './product';

@Component({
    templateUrl: '../../app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;

    constructor(private _route: ActivatedRoute,
        private _router: Router, private productService: ProductService) {
    }

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id'];
        this.productService.getProduct(id)
            .subscribe((data) => {
                this.product = data;
            });
        this.pageTitle += `: ${id}`;
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
}
