import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/auth.service';
import { UserRoutingModule } from './user.routing.module';
@NgModule({
    declarations: [LoginComponent],
    imports: [SharedModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
    providers:[AuthService]

})
export class UserModule {

}