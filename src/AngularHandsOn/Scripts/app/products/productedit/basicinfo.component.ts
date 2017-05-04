import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ValidatorService } from '../../shared/validator.service';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
    templateUrl: '../../app/products/productedit/basicinfo.component.html'
})
export class ProductBasicInfoComponent implements OnInit {
    productInfoForm: FormGroup;
    private sub: Subscription;
    product: IProduct;
    validationMessages: {
        [key: string]: {
            [key: string]: string
        }
    };
    private displayMessage: {
        [key: string]: string
    }; 
        


    constructor(private route: ActivatedRoute, private productService: ProductService,
        private router: Router, private fb: FormBuilder) {
        this.validationMessages = {
            productName: {
                required: 'Product Name is required.',
            },
            productCode: {
                required: 'Product Code is required.'
            },
            starRating: {
                range: 'Rating range is from 1 to 5'
            }
        };
    }
    buildForm() {
        this.productInfoForm = this.fb.group({
            productName: ['', Validators.required],
            productCode: ['', Validators.required],
            starRating: ['', ValidatorService.ratingRange(1,5)],
            availabilityDate: '',
            description: '',
            tags: this.fb.array([])
        });
    }
    ngOnInit() {
        this.buildForm();
        // this.id = +this.route.snapshot.url[0];
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );


        this.productInfoForm.valueChanges.debounceTime(800).subscribe(value => {
            this.displayMessage = ValidatorService.processValidations(this.productInfoForm, this.validationMessages);
        });
    }
    get tags(): FormArray {
        return <FormArray>this.productInfoForm.get('tags');
    }
    addTag() {
        this.tags.push(new FormControl());
    }
    getProduct(id: number) {
        this.productService.getProduct(id)
            .subscribe(data => {
                this.onProductRetrived(data);
            });
    }
    onProductRetrived(data: IProduct) {
        this.product = data;
        this.productInfoForm.patchValue({
            productName: data.productName,
            productCode: data.productCode,
            starRating: data.starRating,
            description: data.description
        });
        this.productInfoForm.setControl('tags', this.fb.array(data.tags));
    }
    delete() {
        this.productService.deleteProduct(this.product.productId)
            .subscribe(data => this.onSaveCompleted());
    }
    submit() {
        if (this.productInfoForm.dirty && this.productInfoForm.valid) {
            
            Object.assign(this.product, this.productInfoForm.value);
            this.productService.updateProduct(this.product)
                .subscribe(data => this.onSaveCompleted());
        }

    }
    onSaveCompleted() {
        // Reset the form to clear the flags
        this.productInfoForm.reset();
        this.router.navigate(['/products']);
    }
}