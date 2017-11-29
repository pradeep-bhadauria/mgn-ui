import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../../_app_settings/index';

@Injectable()
export class ConnectionsService {
    constructor(private http: Http) { }
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    updateMessageThread(thread_id:Number, connection_user_id:Number){
        let body = {
            message_thread_id:thread_id
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/connection/'+connection_user_id+"/message-thread", body ,this.jwt()
        ).map((response: Response) => response);
    }

    getConnection(id:Number) {
        return this.http.get( 
            AppSettings.API_ENDPOINT + '/' + this.currentUser.id +"/connection/", this.jwt()
        ).map((response: Response) => JSON.parse(response.json().data));
    }

    getAllConnections() {    
        return this.http.get( AppSettings.API_ENDPOINT + '/' + this.currentUser.id +"/connection/", this.jwt()
        ).map((response: Response) => JSON.parse(response.json().data));
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