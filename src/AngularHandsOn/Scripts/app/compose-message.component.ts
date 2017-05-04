import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { slideInDownAnimation } from './animations';

@Component({
    moduleId: module.id,
    templateUrl: 'compose-message.component.html',
    styles: [':host { position: relative; bottom: 10%; }'],
    animations: [slideInDownAnimation]
})
export class ComposeMessageComponent {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';
    sending: boolean;
    details: string;
    message: string;
    constructor(private router: Router) {
    }

    send() {
        this.details = 'Sending Message...';
        this.sending = true;
        setTimeout(() => {
            this.sending = false;
            this.closePopup();
        }, 1000);
    }
    closePopup() {
        this.router.navigate([{
            outlets: { popup: null }
        }]);
    }
    cancel() {
        this.closePopup();
    }
    
}