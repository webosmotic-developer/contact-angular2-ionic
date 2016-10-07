import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import './rxjs-extensions';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { ContactDetailsPage } from '../pages/contact.details/contact.details';

@NgModule({
    declarations: [
        MyApp,
        ContactPage,
        ContactDetailsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ContactPage,
        ContactDetailsPage
    ],
    providers: []
})
export class AppModule {
}
