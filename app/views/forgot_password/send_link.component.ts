import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService, NavService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'send_link.component.html'
})

export class ForgotPasswordComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private navService: NavService) { 
            this.navService.showNavBar.emit({v:false});
        }

    sendPasswordLink() {
        this.loading = true;
        this.authenticationService.sendPasswordLink(this.model.email)
            .subscribe(
                data => {
                    this.alertService.success(data.message);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error.json().message);
                    this.loading = false;
                });
    }
}
