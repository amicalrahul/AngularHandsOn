import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ValidatorService } from '../../shared/validator.service';

@Component({
    templateUrl: '../../app/products/productedit/basicinfo.component.html'
})
export class ProductBasicInfoComponent implements OnInit {
    productInfoForm: FormGroup;
    id: number;
    private sub: Subscription;
    validationMessages : {
        [key: string]: {
            [key: string]: string
        }
    }
    private displayMessage: {
        [key: string]: string
    } 
        


    constructor( private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder) {
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
            }
        );
        this.validationMessages = {
            productName: {
                required: "Product Name is required.",
            },
            productCode: {
                required: "Product Code is required."
            },
            rating: {
                range: "Rating range is from 1 to 5"
            }
        };
    }
    buildForm() {
        this.productInfoForm = this.fb.group({
            productName: ['', Validators.required],
            productCode: ['', Validators.required],
            rating: ['', ValidatorService.ratingRange(1,5)],
            availabilityDate: '',
            description: '',
            tags: this.fb.array([])
        });
    }
    ngOnInit() {
        this.buildForm();
        this.id = +this.route.snapshot.url[0];
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

}