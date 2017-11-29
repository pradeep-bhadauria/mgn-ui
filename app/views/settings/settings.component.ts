import { Component, OnInit, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, NavService, SettingsService } from '../../_services/index';
import { ProfileSetting, UsernameSetting, PasswordSetting, EmailSetting, CurrencySetting, TimezoneSetting, LanguageSetting } from './index';

@Component({
    moduleId: module.id,
    templateUrl: 'settings.component.html',
    styleUrls: ["settings.component.css"]
})

export class SettingsComponent implements OnInit {
    model: any = {};
    loading = false;
    menuType: String = "";
    compFactory: ComponentFactory<any>;
    @ViewChild('settingForm', { read: ViewContainerRef }) settingForm: ViewContainerRef;

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['type'] != null) {
                this.menuType = params['type'];
            } else {
                this.menuType = "profile"
            }
        });
    }
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private settingsService: SettingsService,
        private navService: NavService,
        private route: ActivatedRoute,
        private compFactoryResolver: ComponentFactoryResolver) {
        this.navService.showNavBar.emit({ v: true });
        this.loading = true;
        router.events.subscribe(
            data => {
                this.settingForm.clear();
                this.typeResolver(this.menuType);
            }
        );
        
    }

    typeResolver(type: String) {
        if (this.menuType === "profile") {
            this.getProfile();
        } else if (this.menuType === "currency") {
            this.getCurrency();
        } else if (this.menuType === "email") {
            this.getEmail();
        } else if (this.menuType === "language") {
            this.getLanguage();
        } else if (this.menuType === "password") {
            this.getPassword();
        } else if (this.menuType === "timezone") {
            this.getTimezone();
        } else if (this.menuType === "username") {
            this.getUsername();
        }else if (this.menuType === "account") {
            this.getUsername();
        }
    }

    getProfile() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(ProfileSetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
    getUsername() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(UsernameSetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
    getPassword() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(PasswordSetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
    getEmail() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(EmailSetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
    getCurrency() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(CurrencySetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
    getLanguage() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(LanguageSetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
    getTimezone() {
        this.compFactory = this.compFactoryResolver.resolveComponentFactory(TimezoneSetting);
        this.settingForm.createComponent(this.compFactory);
        this.loading = false;
    }
}
