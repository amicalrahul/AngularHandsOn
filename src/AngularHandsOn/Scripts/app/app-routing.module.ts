﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';

@NgModule({
    imports:[
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent }
    ],
        { useHash: true }
    )],
    exports: [RouterModule]

})
export class AppRoutingModule {
}