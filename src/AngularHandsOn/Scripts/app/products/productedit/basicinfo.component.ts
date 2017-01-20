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
    constructor(
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder
    ) {
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
            }
        );
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
    }
    get tags(): FormArray {
        return <FormArray>this.productInfoForm.get('tags');
    }
    addTag() {
        this.tags.push(new FormControl());
    }

}