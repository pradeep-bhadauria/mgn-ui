import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppSettings } from '../../_app_settings/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            email:email,
            password:password
        }
        return this.http.post( AppSettings.API_ENDPOINT + '/auth/', body, headers)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = JSON.parse(response.json().data);
                
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    sendPasswordLink(email: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            email:email
        }
        return this.http.post( AppSettings.API_ENDPOINT + '/auth/send-password-link', body, headers)
            .map((response: Response) => response.json());
    }

    sendConfirmationEmail(email: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            email:email
        }
        return this.http.post( AppSettings.API_ENDPOINT + '/auth/send-email-verification', body, headers)
            .map((response: Response) => response.json());
    }

    changePassword(email: string, token: string, password: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            password:password,
            email:email,
            token:token
        }
        return this.http.put( AppSettings.API_ENDPOINT + '/auth/forgot-password', body, headers)
            .map((response: Response) => response.json());
    }

    confirmEmail(email: string, token: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            email:email,
            token:token
        }
        return this.http.put( AppSettings.API_ENDPOINT + '/auth/confirm-email', body, headers)
            .map((response: Response) => response.json());
    }
}