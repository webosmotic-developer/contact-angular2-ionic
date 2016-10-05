import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import './rxjs-extensions';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { ContactDetailsPage } from '../pages/contact.details/contact.details';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
    declarations: [
        MyApp,
        ContactPage,
        ContactDetailsPage,
        TabsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ContactPage,
        ContactDetailsPage,
        TabsPage
    ],
    providers: []
})
export class AppModule {
}
