//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SettingsService, AlertService, NavService} from '../../../../_services/index';
import { User} from '../../../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'email.html'
})

export class EmailSetting {
  loading:false;
  currentUser: User;

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
  
  saveEmail(){
      this.settingService.updateEmail(this.currentUser.email)
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