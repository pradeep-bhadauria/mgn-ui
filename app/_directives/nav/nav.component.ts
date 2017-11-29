import { Component, OnInit , Injectable, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { NavService, AlertService, AuthenticationService } from '../../_services/index';
import { User, Notification, Message } from '../../_models/index';

@Component({
    moduleId: module.id,
    selector: 'nav',
    templateUrl: 'nav.component.html'
})

@Injectable()
export class NavComponent implements OnInit {
    showMenu = false;
    loading = false;
    currentUser = User;
    notifications: Notification[] = [];
    messages: Message[] = [];
    redirectUrl: string;
    
    constructor(
        @Inject(DOCUMENT) private document: any,
        private navService: NavService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.navService.showNavBar.subscribe((mode : any) =>{
            this.showMenu = mode.v;
        });

    }

    ngOnInit() { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getNotifications(){
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

    getUnreadMessages(){
        this.loading = true;
        this.navService.getUnreadMessages()
            .subscribe(
                data => {
                    this.loading = false;
                    //Err - console.log(data[0].message_thread.last_user_message.message_text);
                    console.log(data[1].message_thread.last_user_message.message_text);
                    this.messages = data;
                },
                error => {
                    this.alertService.error(error.json().message);
                    this.loading = false;
                });
    }

    logout() {
        this.authenticationService.logout();
        this.redirectUrl = "/login?returnUrl="+window.location.href;
        this.document.location.href = this.redirectUrl;
    }
}