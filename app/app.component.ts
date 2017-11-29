import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit { 
    showMenu=false;

    ngOnInit() {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser == null){
            this.showMenu = false;
        } else {
            this.showMenu = true;
        }
    }
}