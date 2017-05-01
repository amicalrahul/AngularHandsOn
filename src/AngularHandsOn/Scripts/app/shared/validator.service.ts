import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class ValidatorService {

    static emailMatcher(crtl: AbstractControl): { [key: string]: boolean } | null {
        let email = crtl.get('email');
        let confirmEmail = crtl.get('confirmEmail');
        if (email.pristine || confirmEmail.pristine)
            return null;

        if (email.value !== confirmEmail.value)
            return { 'match': true };
        return null;
    }
    static ratingRange(minValue: number, maxValue: number): ValidatorFn {
        return (crtl: AbstractControl): { [key: string]: boolean } | null => {
            let cValue = crtl.value;
            if ((cValue !== undefined) && (isNaN(cValue) || cValue < minValue || cValue > maxValue))
                return { 'range': true };
            return null;
        };
    }

    static processValidations(formGroup: FormGroup, validationMessages: { [key: string]: { [key: string]: string } }): { [key: string]: string } {
        let messages: { [key: string]: string } = {};
        //  1. FormGroup.controls => property is of type {key: AbstractControl}
        //      so controlKey refers to the string i.e the value of control name
        //  2. hasOwnProperty is the property of an Object not the controls array
        //      and hasOwnProperty checks if the oject array contails the key or not
        for (let controlKey in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(controlKey)) {
                let control = formGroup.controls[controlKey];
                if (control instanceof FormGroup) {
                    let childMessages = this.processValidations(control, validationMessages);
                    // Object.assign => copies all childMessages to messages string
                    Object.assign(messages, childMessages);
                    messages[controlKey] = this.getValidationMessage(controlKey, control, validationMessages);
                }
                else {
                    messages[controlKey] = this.getValidationMessage(controlKey, control, validationMessages);
                }
            }
        }
        return messages;
    }
    static getValidationMessage(controlKey: string, control: AbstractControl, validationMessages: { [key: string]: { [key: string]: string } }) {
        let message: string = '';
        if (validationMessages[controlKey]) {
            message = '';
            if ((control.dirty || control.touched) && control.errors) {
                Object.keys(control.errors).map(key => {
                    if (validationMessages[controlKey][key]) {
                        message += validationMessages[controlKey][key] + ' ';
                    }
                });
            }
        }
        return message;
    }
}