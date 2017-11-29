//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SettingsService, AlertService, NavService} from '../../../../_services/index';
import { User} from '../../../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.html',
    styleUrls: ["profile.css"]
})

export class ProfileSetting {
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
  
  saveName(){
      this.settingService.updateName(this.currentUser)
          .subscribe(
              data => {
                  this.loading = false;
                  this.currentUser.full_name = this.currentUser.first_name + " " + this.currentUser.last_name;
                  localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                  this.alertService.success(data.json().message);
              },
              error => {
                  this.alertService.error(error.json().message);
                  this.loading = false;
              });
  }

  
}