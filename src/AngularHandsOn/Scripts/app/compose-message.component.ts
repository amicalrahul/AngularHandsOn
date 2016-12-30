import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'compose-message.component.html'
})
export class ComposeMessageComponent {
    sending: boolean;
    details: string
    message: string;
    constructor(private router: Router) {
    }

    send() {
        this.details = "Sending Message...";
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