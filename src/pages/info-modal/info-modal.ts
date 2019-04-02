import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the InfoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {
  value : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ViewController : ViewController) {
    this.value = navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoModalPage');
    console.log(this.value);
  }

  closeModal(){
    this.ViewController.dismiss();
  }

}
