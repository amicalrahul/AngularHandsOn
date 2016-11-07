import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../app/products/product';
import { ProductService } from '../../app/products/product.service';

@Component({
    selector: 'pm-products',
    templateUrl: '../../app/products/product-list.component.html',
    styleUrls: ['../../app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    lstFilter: string = 'cart';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    products: IProduct[];
    constructor(private _productService: ProductService) {
       
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    };
    ngOnInit(): void {

       this.products = this._productService.getProducts();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
