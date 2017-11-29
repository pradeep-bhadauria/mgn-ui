import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, NavService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private navService: NavService) { 
            this.navService.showNavBar.emit({v:false});
        }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.json().message);
                    this.loading = false;
                });
    }
}
