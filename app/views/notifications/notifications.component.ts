import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService, NavService, NotificationsService } from '../../_services/index';
import { Notification} from '../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent {
    model: any = {};
    loading = false;
    notifications: Notification[] = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private notificationsService: NotificationsService,
        private navService: NavService) { 
            this.navService.showNavBar.emit({v:true});
            this.loading = true;
            this.navService.getNotifications()
                .subscribe(
                    data => {
                        this.loading = false;
                        this.notifications = data.notifications.notification_list;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }
}
