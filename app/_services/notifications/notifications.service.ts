import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../../_app_settings/index';

@Injectable()
export class NotificationsService {

    constructor(private http: Http) { }
    
    getNotifications() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get( AppSettings.API_ENDPOINT + '/notifications/' + currentUser.id, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}