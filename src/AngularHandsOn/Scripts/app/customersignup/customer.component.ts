import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';
import 'rxjs/add/operator/debounceTime';

import { ValidatorService } from '../shared/validator.service';


@Component({
    selector: 'my-signup',
    templateUrl: '../../app/customersignup/customer.component.html'
})
export class CustomerComponent implements OnInit, AfterViewInit {
    customer: Customer = new Customer();
    customerForm: FormGroup;
    emailMessage: string;
    confirmEmailMessage: string;
    validationMessages: { [key: string]: { [key: string]: string } };
    displayMessage: { [key: string]: string };

    constructor(private fb: FormBuilder) {
        this.validationMessages = {
            emailGroup: {
                match: 'Email and Confirm Email do not match'
            },
            email: {
                required: 'Email is required.',
                pattern: 'Email is not valid'
            },
            confirmEmail: {
                required: 'Email is required.',
                pattern: 'Email is not valid',
                match: 'Email and Confirm Email do not match'
            },
            firstName: {
                required: 'First Name is required.',
                minlength: 'First Name cannot be less than 3 characters'
            },
            lastName: {
                required: 'Last Name is required.',
                maxlength: 'Last Name cannot exceed 50 characters'
            },
            phone: {
                required: 'Phone is required.'
            },
            rating: {
                range: 'Rating range is from 1 to 5'
            }
        };
    }

    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', Validators.required]
            }, { validator: ValidatorService.emailMatcher }),
            phone: [''],
            notification: ['email'],
            rating: ['', ValidatorService.ratingRange(1, 5)],
            sendCatalog: true,
            addresses: this.fb.array([this.buildAddress()])
        });
    }
    buildAddress(): FormGroup {
        return this.fb.group({
            addressType:'home',
            street1: '',
            street2: '',
            city: '',
            state:'',
            zip: ''
        });
    }
    get addresses():FormArray {
        return <FormArray>this.customerForm.get('addresses');
    }
    addAddress() {
        this.addresses.push(this.buildAddress());
    }
    ngAfterViewInit(): void {
        this.subscribeControlToEvents();
    }
    subscribeControlToEvents() {
        this.customerForm.valueChanges.debounceTime(800)
            .subscribe(a => {
                this.displayMessage = ValidatorService.processValidations(this.customerForm, this.validationMessages);
            });
    }

    setNotification(notifyVia: string) {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();

    }
    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
}