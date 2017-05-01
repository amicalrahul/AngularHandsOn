import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
    selector: 'login',
    templateUrl:'../../app/user/login.component.html'
})
export class LoginComponent {
    title = 'Login';
    loginForm: any = null;
    loginError = false;
    constructor(private fb: FormBuilder,
        private router: Router,
        private authService: AuthService) {
        this.loginForm = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    performLogin(e: any) {
        e.preventDefault();
        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;
        this.authService.login(username, password)
            .subscribe((data: any) => {
                // login successful
                this.loginError = false;
                let auth = this.authService.getAuth();
                alert('Our Token is: ' + auth.token);
                this.router.navigate(['/products']);
            },
            (err: any) => {
                console.log(err);
                // login failure
                this.loginError = true;
            });
    }
}