import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { AlertService, AuthenticationService, NavService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private navService: NavService
        ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.navService.showNavBar.emit({v:false});
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.document.location.href = this.returnUrl;
                },
                error => {
                    this.alertService.error(error.json().message);
                    this.loading = false;
                });
    }
}
