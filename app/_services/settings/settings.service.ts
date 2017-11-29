import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../../_app_settings/index';
import { User} from '../../_models/index';

@Injectable()
export class SettingsService {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private http: Http) { }
    /*
    Profile Services
    */
    getName() {    
        return this.http.get( 
            AppSettings.API_ENDPOINT + '/master-user/' + this.currentUser.id + '/name', this.jwt()
            ).map(
                (response: Response) => JSON.parse(response.json().data)
                );
    }

    updateName(currentUser:User) {
        let body = {
            first_name:currentUser.first_name,
            last_name:currentUser.last_name,
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/master-user/'+ this.currentUser.id + '/name', 
            body ,this.jwt()
            ).map(
                (response: Response) => response
                );
    }


    updatePassword(password:String) {
        let body = {
            password:password
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/master-user/'+ this.currentUser.id + '/password', 
            body ,this.jwt()
            ).map(
                (response: Response) => response
                );
    }

    updateEmail(email:String) {
        let body = {
            email:email
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/master-user/'+ this.currentUser.id + '/email', 
            body ,this.jwt()
            ).map(
                (response: Response) => response
                );
    }

    updateUsername(uname:String) {
        let body = {
            username:uname
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/master-user/'+ this.currentUser.id + '/username', 
            body ,this.jwt()
            ).map(
                (response: Response) => response
                );
    }

    updateActive(flag:Number) {
        let body = {
            is_active:flag
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/master-user/'+ this.currentUser.id + '/is-active', 
            body ,this.jwt()
            ).map(
                (response: Response) => response
                );
    }

    updateDelete(flag:Number) {
        let body = {
            is_deleted:flag
        }
        return this.http.put( 
            AppSettings.API_ENDPOINT + '/master-user/'+ this.currentUser.id + '/is-deleted', 
            body ,this.jwt()
            ).map(
                (response: Response) => response
                );
    }



    //Language
    
    //



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