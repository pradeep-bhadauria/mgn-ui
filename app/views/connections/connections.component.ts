import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, NavService, ConnectionsService } from '../../_services/index';
import { Connection } from '../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'Connections.component.html',
    styleUrls: ["connections.component.css"]
})

export class ConnectionsComponent implements OnInit{
    model: any = {};
    loading = false;
    connections: Connection[] = [];
    menuType: String= "";
    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params['type'] != null){
                this.menuType = params['type'];
            } else {
                this.menuType = "default"
            }
        });
        if(this.menuType === "default"){
            this.getMyConnections();
        }
    }
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private connectionsService: ConnectionsService,
        private navService: NavService,
        private route: ActivatedRoute) { 
            this.navService.showNavBar.emit({v:true});
            this.loading = true;
            
        }

        getMyConnections(){
            this.connectionsService.getAllConnections()
                .subscribe(
                    data => {
                        this.loading = false;
                        this.connections = data;
                    },
                    error => {
                        this.alertService.error(error.json().message);
                        this.loading = false;
                    });
        }
}
