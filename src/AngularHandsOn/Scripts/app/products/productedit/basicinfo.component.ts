import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: '../../app/products/productedit/basicinfo.component.html'
})
export class ProductBasicInfoComponent implements OnInit {
    productInfoForm: FormGroup;
    id: number;
    constructor(
        private route: ActivatedRoute,
        private router: Router, private formBuilder: FormBuilder
    ) { }
    buildForm() {
        this.productInfoForm = new FormGroup({
            productName: this.formBuilder.control(null),
            productCode: this.formBuilder.control(null),
            availabilityDate: this.formBuilder.control(null),
            description: this.formBuilder.control(null)
        });
    }
    ngOnInit() {
        this.buildForm();
        this.id = +this.route.snapshot.url[0];
    }
}