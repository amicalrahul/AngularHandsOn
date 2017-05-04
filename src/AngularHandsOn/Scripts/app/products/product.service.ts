import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IProduct } from '../../app/products/product';
@Injectable()
export class ProductService {

    constructor(private _http: Http) { }


    productsUrl: string = '/api/home1/Products/';

    getAllProducts(): Observable<IProduct[]> {
        return this._http.get(this.productsUrl)
            .map(this.mapProductResponse)
            .do(data => console.log('GetProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    private mapProductResponse(response: Response) {
        return <IProduct[]>response.json();
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getProduct(id: number): Observable<IProduct> {
        return this._http.get(this.productsUrl + id)
            .map((response: Response) => (<IProduct>response.json()))
            .do(data => console.log('GetProductByID: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    addProduct(body: Object): Observable<IProduct[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this.productsUrl, JSON.stringify(body), options)
            .map(this.mapProductResponse)
            .catch(this.handleError);
    }
    updateProduct(body: IProduct): Observable<IProduct[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.put(`${this.productsUrl}${body['productId']}`, JSON.stringify(body), options)
            .map(this.mapProductResponse)
            .catch(this.handleError);
    }
    deleteProduct(id: number): Observable<IProduct[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.delete(`${this.productsUrl}${id}`, options)
            .map(this.mapProductResponse)
            .catch(this.handleError);
    }
    getProducts(): IProduct[] {
        return [
            {
                'productId': 2,
                'productName': 'Garden Cart1',
                'productCode': 'GDN-0023',
                'releaseDate': 'March 18, 2016',
                'description': '15 gallon capacity rolling garden cart',
                'price': 32.99,
                'starRating': 4.2,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
                'tags':[]
            },
            {
                'productId': 5,
                'productName': 'Hammer',
                'productCode': 'TBX-0048',
                'releaseDate': 'May 21, 2016',
                'description': 'Curved claw steel hammer',
                'price': 8.9,
                'starRating': 4.8,
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
                'tags': []
            }
        ];
    }
}
