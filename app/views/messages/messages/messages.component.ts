import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import * as moment from 'moment/moment';
import { AlertService, AuthenticationService, NavService, MessagesService } from '../../../_services/index';
import { Thread, User, MessageStatus} from '../../../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ["messages.component.css"]
	
})

export class MessagesComponent  implements OnInit, AfterViewChecked{
    currentUser: User;
    model: any = {};
    loading = false;
    loading_messages = false;
    sending=false;
    threads: Thread[] = [];
    participants: Thread[] = [];
    messages: MessageStatus[] = [];
    height_member_list = window.innerHeight - 165;
    height_chat_area = window.innerHeight - 276;
    isMobile = false;
    display_message_section = "block";
    display_chat_sidebar = "block";
    thread_type = "Inbox";
    thread_id: Number = null;
    moment = moment();
    isAttachment: number = null;
    attachmentURL: string = null;
    @ViewChild('messagesWindow') private messagesContainer: ElementRef;

    ngOnInit() { 
        this.scrollToBottom();
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute ,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private messagesService: MessagesService,
        private navService: NavService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
            this.navService.showNavBar.emit({v:true});
            this.loading = true;
            if(window.getComputedStyle(document.getElementsByClassName("navbar-toggle")[0]).display != "none"){
                this.isMobile = true;
            }
            this.loadThreads();
        }

        loadThreads(){
            this.route.fragment.subscribe((fragment: string) => {
                this.loading = true; 
                this.messages = null;
                this.threads = null;
                this.thread_id = null;
                this.isAttachment = 0;
                this.attachmentURL = "";

                if(fragment != null){
                    this.thread_type = fragment;
                    if(this.thread_type == 'Inbox'){
                        this.getThreads(0);
                    } else if(this.thread_type == 'Unread'){
                        this.getUnreadThreads(0);
                    } else if(this.thread_type == 'Archived'){
                        this.getArchiveThreads(0);
                    } else if(this.thread_type == 'Spam'){
                        this.getSpamThreads(0);
                    } 
                } else {
                    this.getThreads(0);
                }
            })
        }

        getTime(date: String){
            return moment.utc(date).fromNow();
        }
        onResize() {
            this.height_member_list = window.innerHeight - 165;
            this.height_chat_area = window.innerHeight - 276;
            if(window.getComputedStyle(document.getElementsByClassName("navbar-toggle")[0]).display != "none"){
                this.isMobile = true;
                this.display_chat_sidebar = "block";
                this.display_message_section = "none";
            } else {
                this.isMobile = false;
                this.display_chat_sidebar = "block";
                this.display_message_section = "block";
            }
        }
        mobileBack(){
            if(window.getComputedStyle(document.getElementsByClassName("navbar-toggle")[0]).display != "none"){
                this.isMobile = true;
                this.display_chat_sidebar = "block";
                this.display_message_section = "none";
            } else {
                this.isMobile = false;
                this.display_chat_sidebar = "block";
                this.display_message_section = "block";
            }
        }
        getChatSidebarDisplay(){
            return this.display_chat_sidebar;
        }
        
        getMessageSectionDisplay(){
            return this.display_message_section;
        }

        showMessages(){
            if(window.getComputedStyle(document.getElementsByClassName("navbar-toggle")[0]).display != "none"){
                this.isMobile = true;
                this.display_chat_sidebar = "none";
                this.display_message_section = "block";
            } else {
                this.isMobile = false;
                this.display_chat_sidebar = "block";
                this.display_message_section = "block";
            }
        }

        getThreads(offset: Number) {    
            this.messagesService.getThreads(offset)
                .subscribe(
                    data => {
                        this.loading = false;
                        for(var i=0; i<data.length; i++){
                            if(i==0){
                                this.getMessages(data[i].message_thread.id, 0)
                            }
                            data[i].participants = JSON.parse(data[i].participants)
                        }
                        this.threads = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        getUnreadThreads(offset: Number) {
            this.messagesService.getUnreadThreads(offset)
                .subscribe(
                    data => {
                        this.loading = false;
                        for(var i=0; i<data.length; i++){
                            if(i==0){
                                this.getMessages(data[i].message_thread.id, 0)
                            }
                            data[i].participants = JSON.parse(data[i].participants)
                        }
                        this.threads = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        getSpamThreads(offset: Number) {
            this.messagesService.getSpamThreads(offset)
                .subscribe(
                    data => {
                        this.loading = false;
                        for(var i=0; i<data.length; i++){
                            if(i==0){
                                this.getMessages(data[i].message_thread.id, 0)
                            }
                            data[i].participants = JSON.parse(data[i].participants)
                        }
                        this.threads = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        getArchiveThreads(offset: Number) {
            this.messagesService.getArchiveThreads(offset)
                .subscribe(
                    data => {
                        this.loading = false;
                        for(var i=0; i<data.length; i++){
                            if(i==0){
                                this.getMessages(data[i].message_thread.id, 0)
                            }
                            data[i].participants = JSON.parse(data[i].participants)
                        }
                        this.threads = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        getMessages(thread_id:Number, offset: Number) {
            this.thread_id = thread_id;
            this.loading_messages = true;
            
            this.messagesService.getMessages(this.thread_id, offset)
                .subscribe(
                    data => {
                        this.loading_messages = false;
                        this.messages = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading_messages = false;
                    });
            this.getParticipants(this.thread_id, 0);
            if(offset == 0){
                this.scrollToBottom();
            }
        }

        getParticipants(thread_id:Number, offset: Number) {
            this.messagesService.getParticipants(thread_id, offset)
                .subscribe(
                    data => {
                        this.loading = false;
                        console.log(data);
                        this.participants = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        threadReply(messageText:string){
            if(this.thread_id == null){
                this.alertService.error("Select the conversation first to reply");
            } else {
                this.sending=true;
                if(messageText != "") {
                    this.messagesService.sendMessage(this.thread_id, messageText, this.isAttachment, this.attachmentURL)
                        .subscribe(
                            data => {
                                this.sending = false;
                                this.getMessages(this.thread_id, 0);
                            },
                            error => {
                                this.alertService.error(error.json().message);
                                this.sending = false;
                            });
                    
                } else {
                    this.alertService.error("Message field cannot be empty");
                    this.sending = false;
                }
            }
        }


        ngAfterViewChecked() {        
            this.scrollToBottom();        
        }


        scrollToBottom(): void {
            try {
                this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
            } catch(err) { }                 
        }

        deleteThread() {
            this.messagesService.deleteThread(this.thread_id)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.loadThreads();
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        archiveThread() {
            this.messagesService.archiveThread(this.thread_id)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.loadThreads();
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        unarchiveThread() {
            this.messagesService.unarchiveThread(this.thread_id)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.loadThreads();
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        leaveThread() {
            this.messagesService.leaveThread(this.thread_id)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.loadThreads();
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        muteThread(is_muted: Number) {
            this.messagesService.muteThread(this.thread_id, is_muted)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.loadThreads();
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

        spamThread(is_spam: Number) {
            this.messagesService.spamThread(this.thread_id, is_spam)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.loadThreads();
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }

}
