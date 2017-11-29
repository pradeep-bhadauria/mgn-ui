//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SettingsService, AlertService, NavService} from '../../../../_services/index';
import { User} from '../../../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'password.html'
})

export class PasswordSetting {
  loading:false;
  password:String = "";
  confirmPassword:String = "";

  constructor(
    private settingService: SettingsService,
    private alertService: AlertService,
    private navService: NavService
  ){
    this.navService.showNavBar.emit({v:true});
    
  }
  
  savePassword(){
      if(this.password.trim() === '' || this.confirmPassword.trim() === ''){
        this.alertService.error("Password or Confirm password cannot be empty");
      } else if(this.password != this.confirmPassword){
        this.alertService.error("Password & Confirm password dosent match. Please check and try again.");
      } else if(this.password.length < 7) {
        this.alertService.error("Password should be atleast 7 characters long.");
      } else {
      this.settingService.updatePassword(this.password)
          .subscribe(
              data => {
                  this.loading = false;
                  this.alertService.success(data.json().message);
              },
              error => {
                  this.alertService.error(error.json().message);
                  this.loading = false;
              });
      }
  }

  
}