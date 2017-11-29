import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, NavService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ["home.component.css"]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    showMenu = true;

    constructor(private userService: UserService, private navService: NavService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.navService.showNavBar.emit({v:true});
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}