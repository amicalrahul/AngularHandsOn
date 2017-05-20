import { Component, OnInit } from '@angular/core';
import { IProduct } from 'app/products/product';
import { ProductService } from 'app/products/services/product.service';

@Component({
 selector: 'ang2-products',
    templateUrl: '/product-list.component.html'
})
export class ProductListComponent implements OnInit {

   pageTitle = 'Product List';
    lstFilter = '';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    products: IProduct[];
    constructor(private _productService: ProductService) {

    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {

       this._productService.getAllProducts()
           .subscribe(data => this.products = data);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
