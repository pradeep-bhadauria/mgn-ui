import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../../_app_settings/index';

@Injectable()
export class MessagesService {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private http: Http) { }
    
    getThreads(offset: Number) {    
        return this.http.get( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/offset/' + offset, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getUnreadThreads(offset: Number) {
        return this.http.get( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/unread/offset/' + offset, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getSpamThreads(offset: Number) {
        return this.http.get( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/spam/offset/' + offset, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getArchiveThreads(offset: Number) {
        return this.http.get( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/archive/offset/' + offset, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getMessages(thread_id:Number, offset: Number) {
        return this.http.get( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/'+ thread_id +'/messages/offset/' + offset, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    getParticipants(thread_id:Number, offset: Number) {
        return this.http.get( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/'+ thread_id +'/participants/offset/' + offset, this.jwt()).map((response: Response) => JSON.parse(response.json().data));
    }

    sendMessage(thread_id:Number, message: string, isAttachment:number, url:string) {
        let body = undefined;
        if (url == ""){
            body = {
                message_text: message,
                has_attachment: isAttachment
            }
        } else {
             body = {
                message_text: message,
                has_attachment: isAttachment,
                attachment_url: url
            }
        }
        return this.http.post( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/'+ thread_id +'/message', body,this.jwt()).map((response: Response) => response);
    }

    createThread() {
        let body = {}
        return this.http.post( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/', body ,this.jwt()).map((response: Response) => response);
    }

    addParticipants(thread_id:Number, participant_list:Number[]) {
        let body = {
            participant_list: participant_list
        }
        return this.http.post( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/'+thread_id+'/participants', body ,this.jwt()).map((response: Response) => response);
    }


    deleteThread(thread_id:Number) {
        return this.http.delete( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/' + thread_id ,this.jwt()).map((response: Response) => response);
    }

    archiveThread(thread_id:Number) {
        let body = {}
        return this.http.put( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/' + thread_id + '/archive', body ,this.jwt()).map((response: Response) => response);
    }

    unarchiveThread(thread_id:Number) {
        let body = {}
        return this.http.put( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/' + thread_id + '/unarchive', body ,this.jwt()).map((response: Response) => response);
    }

    leaveThread(thread_id:Number) {
        let body = {}
        return this.http.put( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/' + thread_id + '/exit', body ,this.jwt()).map((response: Response) => response);
    }

    muteThread(thread_id:Number, is_muted: Number) {
        let body = {
            is_muted: is_muted
        }
        return this.http.put( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/' + thread_id + '/mute', body ,this.jwt()).map((response: Response) => response);
    }

    spamThread(thread_id:Number, is_spam: Number) {
        let body = {
            is_spam: is_spam
        }
        return this.http.put( AppSettings.API_ENDPOINT + '/'+ this.currentUser.id +'/message-threads/' + thread_id + '/spam', body ,this.jwt()).map((response: Response) => response);
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