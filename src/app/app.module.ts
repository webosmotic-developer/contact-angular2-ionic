import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import './rxjs-extensions';
import { MyApp } from './app.component';

import { UserService } from '../shared/user/user.service';

import { ContactPage } from '../pages/contact/contact';
import { ContactDetailsPage } from '../pages/contact.details/contact.details';
import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';

@NgModule({
    declarations: [
        MyApp,
        ContactPage,
        ContactDetailsPage,
        TabsPage,
        SignInPage,
        SignUpPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ContactPage,
        ContactDetailsPage,
        TabsPage,
        SignInPage,
        SignUpPage
    ],
    providers: [UserService, Storage]
})
export class AppModule {
}
