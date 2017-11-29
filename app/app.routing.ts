import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ForgotPasswordComponent, ForgotPasswordChangeComponent } from './views/forgot_password/index';
import { EmailVerificationComponent, ConfirmEmailComponent } from './views/email_verification/index';
import { NotificationsComponent } from './views/notifications/index';
import { MessagesComponent, SendMessageComponent } from './views/messages/index';
import { ConnectionsComponent } from './views/connections/index';
import { SettingsComponent } from './views/settings/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'change-password', component: ForgotPasswordChangeComponent },
    { path: 'email-verification', component: EmailVerificationComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]  },
    { path: 'new-message', component: SendMessageComponent, canActivate: [AuthGuard] },
    { path: 'connections', component: ConnectionsComponent, canActivate: [AuthGuard] },
    { path: 'connections/:type', component: ConnectionsComponent, canActivate: [AuthGuard] },
    { path: 'settings/:type', component: SettingsComponent, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);