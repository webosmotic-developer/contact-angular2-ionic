import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { ContactDetailsPage } from '../contact.details/contact.details';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root:any = ContactPage;
    tab2Root:any = ContactDetailsPage;
    tab3Root:any;

    isExitBtnShow:boolean = false;

    constructor(private platform:Platform) {
        if (this.platform.is('android')) {
            this.isExitBtnShow = true;
        }
    }

    fnExit(){
        this.platform.exitApp();
    }
}
