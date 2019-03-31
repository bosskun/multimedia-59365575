import { HomePage } from './../home/home';
import { TestPage } from './../test/test';
import { ContentPage } from './../content/content';
import { Component ,ElementRef,ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  @ViewChild('canvas') canvas: ElementRef;
  constructor(
    public navCtrl: NavController,
    private loading: LoadingController,) {
    
  }


  homePage(){
    this.navCtrl.push(TestPage);
    let loading = this.loading.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  
  contentPage(){
    this.navCtrl.parent.select(1);
  }

  aboutPages(){
    this.navCtrl.parent.select(2);
  }

  visionPage(){
    this.navCtrl.parent.select(3);
  }

  
  


}
