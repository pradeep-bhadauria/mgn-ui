import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, NavService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'change_password.component.html'
})

export class ForgotPasswordChangeComponent {
    model: any = {};
    loading = false;
    email = "";
    token = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private navService: NavService) { 
            this.navService.showNavBar.emit({v:false});
        }

    ngOnInit() {
        this.email = this.route.snapshot.queryParams['email'];
        this.token = this.route.snapshot.queryParams['token'];
    }

    changePassword() {
        this.loading = true;
        
        this.authenticationService.changePassword(this.email, this.token, this.model.password)
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
