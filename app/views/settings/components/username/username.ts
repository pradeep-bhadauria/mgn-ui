//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SettingsService, AlertService, NavService} from '../../../../_services/index';
import { User} from '../../../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'username.html'
})

export class UsernameSetting {
  loading:false;
  currentUser: User;
  dob:Date = null;
  gender:String = "";

  constructor(
    private settingService: SettingsService,
    private alertService: AlertService,
    private navService: NavService
  ){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    this.navService.showNavBar.emit({v:true});
    
  }
  
  click(){
    alert('You clicked me !');
  }
  
  saveUsername(){
      this.settingService.updateUsername(this.currentUser.username)
          .subscribe(
              data => {
                  this.loading = false;
                  localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                  this.alertService.success(data.json().message);
              },
              error => {
                  this.alertService.error(error.json().message);
                  this.loading = false;
              });
  }

  
}