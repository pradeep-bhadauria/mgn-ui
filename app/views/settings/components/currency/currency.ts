//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Component({
    moduleId: module.id,
    templateUrl: 'currency.html'
})

export class CurrencySetting {
  title:string;
  
  constructor(){
    this.title="Hello World";
  }
  
  click(){
    alert('You clicked me !');
  }
  
}