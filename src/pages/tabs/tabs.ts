import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { SignInPage } from '../signin/signin';
import { SignUpPage } from '../signup/signup';


@Component({
    templateUrl: 'tabs.html'
})

export class TabsPage {
    // set the root pages for each tab
    tab1Root:any = SignInPage;
    tab2Root:any = SignUpPage;
    intSelectedIndex:number;

    constructor(navParams:NavParams) {
        this.intSelectedIndex = navParams.data.tabIndex || 0;
    }
}
