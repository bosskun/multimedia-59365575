import { TestPage } from './../pages/test/test';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { MenuPage } from './../pages/menu/menu';
import { ContentPage } from './../pages/content/content';
import { TabsPage } from '../pages/tabs/tabs';

import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import { Camera } from '@ionic-native/camera';
import { environment } from '../environment';
import { GetElectionProvider } from '../providers/get-election/get-election';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MenuPage,
    ContentPage,
    TestPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,

    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MenuPage,
    ContentPage,
    TestPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GoogleCloudVisionServiceProvider,
    GetElectionProvider
  ]
})
export class AppModule { }