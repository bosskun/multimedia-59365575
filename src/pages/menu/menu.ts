import { TestPage } from './../test/test';
import { ContentPage } from './../content/content';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from "jquery";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController) {

  }
  
  contentPage(){
    this.navCtrl.push(TestPage)
  }

  visionPage(){
    this.navCtrl.parent.select(3);
  }



}
