import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './not-found.component';
import { ComposeMessageComponent } from './compose-message.component';
import { CustomerComponent } from './customersignup/customer.component';
import { TestAppComponent } from './testapp/test.component';
const appRoutes: Routes = [
    { path: 'compose', component: ComposeMessageComponent, outlet:'popup' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'signup', component: CustomerComponent },
    { path: 'testapp', component: TestAppComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }
            )],
    exports: [RouterModule]

})
export class AppRoutingModule {
}