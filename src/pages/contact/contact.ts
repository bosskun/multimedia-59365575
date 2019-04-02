import { InfoModalPage } from './../info-modal/info-modal';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController, ToastController, ActionSheetController, Slides} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { e } from '@angular/core/src/render3';
import { LoadedModule } from 'ionic-angular/umd/util/module-loader';
import { LongPressModule } from 'ionic-long-press';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild(Slides) slides: Slides;
  items: FirebaseListObservable<any[]>;
  constructor(
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase,
    private loading: LoadingController,
    private modal: ModalController,
    private toast: ToastController,
    private LongPress: LongPressModule,
    private actionSheetCtrl: ActionSheetController,
    private alert: AlertController) {
    this.items = db.list('items');
  
  }
  
  

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData)
        .subscribe((result) => {
            this.saveResults(imageData, result.json().responses);
        }, err => {
          this.showAlert(err);
        });
    }, err => {
      this.showAlert(err);
    });
  }

  saveResults(imageData, results) {
    this.items.push({ imageData: imageData, results: results })
      .then(_ => { })
      .catch(err => { this.showAlert(err) });
  }
  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  clickToAbout(items){
    const showInfo = this.modal.create(InfoModalPage, { items : items});
    showInfo.present();
    console.log(items);
  }

  presentToast() {
    let toast = this.toast.create({
      dismissOnPageChange: true,
      message: 'Tips : If do you want to delete image please hold image.',
      showCloseButton: true,
      closeButtonText: 'Close',
      position: 'top'
    });
  
    toast.present();
  }


  ionViewWillEnter() {
    this.presentToast();
  }

  presentActionSheet(items) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Do you want to delete',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.items.remove(items.$key).then(() => {
              let alert = this.alert.create({
                title: 'Succes',
                subTitle: "Remove Image successful",
                buttons: ['OK']
              });
              alert.present();
              this.slides.slideTo(0, 500);
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
