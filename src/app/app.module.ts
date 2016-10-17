import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import './rxjs-extensions';
import { MyApp } from './app.component';

import { UserService } from '../shared/user/user.service';

import { ContactPage } from '../pages/contact/contact';
import { ContactDetailsPage } from '../pages/contact.details/contact.details';
import { MainPage } from '../pages/main/main';

@NgModule({
    declarations: [
        MyApp,
        ContactPage,
        ContactDetailsPage,
        MainPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ContactPage,
        ContactDetailsPage,
        MainPage
    ],
    providers: [UserService, Storage]
})
export class AppModule {
}
