import { Component } from '@angular/core';

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

    constructor() {}
}
