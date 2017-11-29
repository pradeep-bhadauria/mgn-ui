import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../../_app_settings/index';
import { User, RegisterUser, UpdateUserName, UpdateUserUsername, UpdateUserEmail, UpdateUserPassword, UpdateUserProfilePic, isActive, isBlocked, isDeleted } from '../../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get( AppSettings.API_ENDPOINT + '/master-user/', this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getById(id: number) {
        return this.http.get( AppSettings.API_ENDPOINT + '/master-user/' + id, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getActiveUser() {
        return this.http.get( AppSettings.API_ENDPOINT + '/master-user/active', this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getInactiveUser() {
        return this.http.get( AppSettings.API_ENDPOINT + '/master-user/inactive', this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    search(q: string) {
        return this.http.get( AppSettings.API_ENDPOINT + '/master-user/search/' + q, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    create(registerUser: RegisterUser) {
        registerUser["auth_type"] = AppSettings.AUTH_TYPES.EMAIL;
        registerUser["mgn_user_type"] = AppSettings.USER_TYPES.GENERAL;
        return this.http.post( AppSettings.API_ENDPOINT + '/master-user/', registerUser, this.jwt()).map((response: Response) => response.json());
    }

    updateName(id:number, userName: UpdateUserName) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/name", userName, this.jwt()).map((response: Response) => response.json());
    }

    updateEmail(id:number, userEmail: UpdateUserEmail) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/email", userEmail, this.jwt()).map((response: Response) => response.json());
    }

    updateUsername(id:number, userUsername: UpdateUserUsername) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/username", userUsername, this.jwt()).map((response: Response) => response.json());
    }

    updatePassword(id:number, userPassword: UpdateUserPassword) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/password", userPassword, this.jwt()).map((response: Response) => response.json());
    }

    updateProfilePic(id:number, userProfilePic: UpdateUserProfilePic) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/profile-pic", userProfilePic, this.jwt()).map((response: Response) => response.json());
    }

    updateIsActive(id:number, isActive: isActive) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/is-active", isActive, this.jwt()).map((response: Response) => response.json());
    }

    updateIsBlocked(id:number, isBlocked: isBlocked) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/is-blocked", isBlocked, this.jwt()).map((response: Response) => response.json());
    }

    updateIsDeleted(id:number, isDeleted: isDeleted) {
        return this.http.put( AppSettings.API_ENDPOINT + '/master-user/' + id + "/is-deleted", isDeleted, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete( AppSettings.API_ENDPOINT + '/master-user/' + id, this.jwt()).map((response: Response) => response.json());
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