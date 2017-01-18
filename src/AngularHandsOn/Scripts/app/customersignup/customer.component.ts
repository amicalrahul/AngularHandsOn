import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from './customer';
import 'rxjs/add/operator/debounceTime';


function emailMatcher(crtl: AbstractControl): { [key: string]: boolean } | null {
    let email = crtl.get('email');
    let confirmEmail = crtl.get('confirmEmail');
    if (email.pristine || confirmEmail.pristine)
        return null;

    if (email.value != confirmEmail.value)
        return { 'match': true };
    return null;
}
function ratingRange(minValue: number, maxValue: number): ValidatorFn {
    return (crtl: AbstractControl): { [key: string]: boolean } | null => {
        let cValue = crtl.value;
        if ((cValue != undefined) && (isNaN(cValue) || cValue < minValue || cValue > maxValue))
            return { 'range': true };
        return null;
    }
}

@Component({
    selector: 'my-signup',
    templateUrl: '../../app/customersignup/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customer: Customer = new Customer();
    customerForm: FormGroup;
    emailMessage: string;
    private validationMessages = {
        required: "Email is required.",
        pattern: "Email is not valid"
    };

    constructor(private fb: FormBuilder) {
    }

    buildForm() {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]],
                confirmEmail: ['', Validators.required]
            }, { validator: emailMatcher }),
            phone: [''],
            notification: ['email'],
            rating: ['', ratingRange(1, 5)],
            sendCatalog: true
        });

        this.customerForm.get('notification').valueChanges
            .subscribe(value => this.setNotification(value));

        let emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.debounceTime(1000)
            .subscribe(value => this.setEmailValidationMessage(emailControl));
    }
    setEmailValidationMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.dirty || c.touched) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                (<any>this.validationMessages)[key]).join(' ');
        }
    }
    ngOnInit() {
        this.buildForm();
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