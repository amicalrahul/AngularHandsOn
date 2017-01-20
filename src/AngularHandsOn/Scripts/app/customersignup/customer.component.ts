import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from './customer';
import 'rxjs/add/operator/debounceTime';

import { ValidatorService } from '../shared/validator.service'


@Component({
    selector: 'my-signup',
    templateUrl: '../../app/customersignup/customer.component.html'
})
export class CustomerComponent implements OnInit, AfterViewInit {
    customer: Customer = new Customer();
    customerForm: FormGroup;
    emailMessage: string;
    confirmEmailMessage: string;
    validationMessages: { [key: string]: { [key: string]: string } }
    displayMessage: { [key: string]: string };

    //private 

    constructor(private fb: FormBuilder) {
        this.validationMessages = {
            emailGroup: {
                match: "Email and Confirm Email do not match"
            },
            email: {
                required: "Email is required.",
                pattern: "Email is not valid"
            },
            confirmEmail: {
                required: "Email is required.",
                pattern: "Email is not valid",
                match: "Email and Confirm Email do not match"
            },
            firstName: {
                required: "First Name is required.",
                minLength: "First Name cannot be less than 3 characters"
            },
            lastName: {
                required: "Last Name is required.",
                maxLength: "Last Name cannot exceed 50 characters"
            },
            phone: {
                required: "Phone is required."
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
                email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]],
                confirmEmail: ['', Validators.required]
            }, { validator: ValidatorService.emailMatcher }),
            phone: [''],
            notification: ['email'],
            rating: ['', ValidatorService.ratingRange(1, 5)],
            sendCatalog: true
        });
    }
    ngAfterViewInit(): void {
        this.subscribeControlToEvents();
    }
    subscribeControlToEvents() {
        this.customerForm.valueChanges.debounceTime(800)
            .subscribe(a => {
                this.displayMessage = this.setEmailValidationMessage(this.customerForm);
            });
    }

    setEmailValidationMessage(formGroup: FormGroup): { [key: string]: string } {
        let messages: { [key: string]: string } = {};
        //  1. FormGroup.controls => property is of type {key: AbstractControl}
        //      so controlKey refers to the string i.e the value of control name
        //  2. hasOwnProperty is the property of an Object not the controls array
        //      and hasOwnProperty checks if the oject array contails the key or not
        for (let controlKey in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(controlKey)) {
                let control = formGroup.controls[controlKey];
                if (control instanceof FormGroup) {
                    let childMessages = this.setEmailValidationMessage(control);
                    //Object.assign => copies all childMessages to messages string
                    Object.assign(messages, childMessages);
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((control.dirty || control.touched) && control.errors) {
                            Object.keys(control.errors).map(key => {
                                if (this.validationMessages[controlKey][key]) {
                                    messages[controlKey] += this.validationMessages[controlKey][key] + ' ';
                                }
                            });
                        }
                    }
                }
                else {
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((control.dirty || control.touched) && control.errors) {
                            Object.keys(control.errors).map(key => {
                                if (this.validationMessages[controlKey][key]) {
                                    messages[controlKey] += this.validationMessages[controlKey][key] + ' ';
                                }
                            });
                        }
                    }
                }
            }
        }
        return messages;
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