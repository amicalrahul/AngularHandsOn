import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidatorService {

    static emailMatcher(crtl: AbstractControl): { [key: string]: boolean } | null {
        let email = crtl.get('email');
        let confirmEmail = crtl.get('confirmEmail');
        if (email.pristine || confirmEmail.pristine)
            return null;

        if (email.value != confirmEmail.value)
            return { 'match': true };
        return null;
    }
    static ratingRange(minValue: number, maxValue: number): ValidatorFn {
        return (crtl: AbstractControl): { [key: string]: boolean } | null => {
            let cValue = crtl.value;
            if ((cValue != undefined) && (isNaN(cValue) || cValue < minValue || cValue > maxValue))
                return { 'range': true };
            return null;
        }
    }
}