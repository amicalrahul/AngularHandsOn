import { Component } from '@angular/core';

@Component({
    selector: 'welcome-app',
    templateUrl: '../../app/home/welcome.component.html'
})

export class WelcomeComponent {
    pageTitle: string = 'Welcome';
}