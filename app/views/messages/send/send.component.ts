import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService, NavService, MessagesService, ConnectionsService } from '../../../_services/index';
import { Message } from '../../../_models/index';

@Component({
    moduleId: module.id,
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: 'send.component.html',
    styleUrls: ["send.component.css"]
})

export class SendMessageComponent {
    model: any = {};
    loading = false;
    messages: Message[] = [];
    public query = '';
    public users:any[] = [];
    public filteredList: any[] = [];
    public elementRef: any;
    participantsList:Number[] = [];
    participants: any[] = [];
    sending = false;
    thread_id: number = null;
    message: string = "";
    isAttachment:number = 0;
    attachmentURL: string = "";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private messagesService: MessagesService,
        private connectionService: ConnectionsService,
        private navService: NavService,
        private myElement: ElementRef) { 
            this.navService.showNavBar.emit({v:true});
            this.elementRef = myElement;
            connectionService.getAllConnections().subscribe(
                                    data => {
                                        console.log(data);
                                        this.users = data;
                                    },
                                    error => {
                                        this.alertService.error(error.json().message);
                                    });

        }
    filter() {
        if (this.query !== ""){
            this.filteredList = this.users.filter(function(el:any){
                return el.connection.full_name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }
    
    select(item:any){
        var flag = false;
        for(var i=0;i<this.participants.length;i++){
            if(this.participants[i].connection.id == item.connection.id){
                flag = true;
            }
        }
        if(flag==false){
            this.participantsList.push(item.connection.id);
            this.participants.push(item);
        }
        this.query = "";
        this.filteredList = [];
    }

    removeParticipant(item:any){
        for(var i=0;i<this.participants.length;i++){
            if(this.participants[i].connection.id == item.connection.id){
                this.participants.splice(i,1);
            }
        }
        for(var i=0;i<this.participantsList.length;i++){
            if(this.participantsList[i] == item.connection.id){
                this.participantsList.splice(i,1);
            }
        }
    }

    handleClick(event:any){
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if(!inside){
            this.filteredList = [];
        }
    }

    sendMessage(messageText:string){
        if(this.participants.length == 0){
            this.alertService.error("Please add the message recipients");
        } else {
            this.sending=true;
            if (this.participantsList.length == 1){
                this.connectionService.getConnection(this.participantsList[0])
                    .subscribe(
                        data => { 
                            if (data[0].message_thread != null){
                                this.thread_id = data[0].message_thread;
                                this.validateMessage(messageText);
                            } else {
                                this.validateMessage(messageText);
                            }
                        },
                        error => {
                            this.alertService.error(error.json().message);
                            this.sending = false;
                        });
            } else {
                this.validateMessage(messageText);
            }
            
        }
    }

    validateMessage(messageText: string){
        if(messageText != "") {
            if(messageText.length > 400){
                this.alertService.error("Message cannot be more than 400 characters");
                this.sending = false;
            } else {
                this.message = messageText;
                this.createThread();
            }
        } else {
            this.alertService.error("Message field cannot be empty");
            this.sending = false;
        }
    }
    createThread() {
        if (this.thread_id == null){
            this.messagesService.createThread()
                .subscribe(
                    data => {
                        this.thread_id = data.json().data;
                        if(this.participantsList.length == 1){
                            this.connectionService.updateMessageThread(this.thread_id,this.participantsList[0])
                                .subscribe(
                                    data => {
                                        this.addParticipants();
                                    },
                                    error => {
                                        this.alertService.error(error.json().message);
                                        this.sending = false;
                                    }
                                );
                        } else {
                            this.addParticipants();
                        }
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.sending = false;
                    });
        } else {
            this.send();
        }
    }
    addParticipants(){
        this.messagesService.addParticipants(this.thread_id, this.participantsList)
            .subscribe(
                data => { this.send(); },
                error => {
                    this.alertService.error(error.json().message);
                    this.sending = false;
                });
    }
    send(){
        this.messagesService.sendMessage(this.thread_id, this.message, this.isAttachment, this.attachmentURL)
                    .subscribe(
                        data => {
                            this.sending = false;
                            this.alertService.success(data.json().message);
                        },
                        error => {
                            this.alertService.error(error.json().message);
                            this.sending = false;
                        });
    }
}
