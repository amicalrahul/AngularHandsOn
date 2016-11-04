import { Component } from '@angular/core';

@Component({
    selector: 'welcome-app',
    templateUrl: 'app/apm/home/welcome.component.html'
})

export class WelcomeComponent {
    welcomeMeaasge: string = "Welcome to Angular2";
}