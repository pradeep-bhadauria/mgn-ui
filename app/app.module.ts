import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent , NavComponent} from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, NavService, NotificationsService, MessagesService, ConnectionsService, SettingsService, FollowersService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ForgotPasswordComponent, ForgotPasswordChangeComponent } from './views/forgot_password/index';
import { EmailVerificationComponent, ConfirmEmailComponent } from './views/email_verification/index';
import { NotificationsComponent } from './views/notifications/index';
import { MessagesComponent, SendMessageComponent } from './views/messages/index';
import { ConnectionsComponent } from './views/connections/index';
import { SettingsComponent, ProfileSetting, UsernameSetting, PasswordSetting, EmailSetting, CurrencySetting, TimezoneSetting, LanguageSetting } from './views/settings/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ForgotPasswordChangeComponent,
        EmailVerificationComponent,
        ConfirmEmailComponent,
        NavComponent,
        NotificationsComponent,
        MessagesComponent,
        SendMessageComponent,
        ConnectionsComponent,
        SettingsComponent, ProfileSetting, UsernameSetting, PasswordSetting, EmailSetting, CurrencySetting, TimezoneSetting, LanguageSetting,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        NavService,
        NotificationsService,
        MessagesService,
        ConnectionsService, SettingsService, FollowersService,
        //mock and test _services
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent],
    entryComponents: [ProfileSetting, UsernameSetting, PasswordSetting, EmailSetting, CurrencySetting, TimezoneSetting, LanguageSetting]
})

export class AppModule { }