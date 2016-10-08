import { Component, ViewChild } from '@angular/core';

import { Platform, Nav, MenuController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ContactPage } from '../pages/contact/contact';
import { ContactDetailsPage } from '../pages/contact.details/contact.details';
import { TabsPage } from '../pages/tabs/tabs';

import { Config } from "../shared/config";
import { UserService } from "../shared/user/user.service";

export interface PageObj {
    title: string;
    component: any;
    icon: string;
    active: string;
    index?: number;
}

@Component({
    templateUrl: 'app.html',
})

export class MyApp {
    isExitBtnShow:boolean = false;
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav:Nav;

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages:PageObj[] = [
        {title: 'Contact List', component: ContactPage, icon: 'contacts', active: '#387ef5'},
        {title: 'Add Contact', component: ContactDetailsPage, index: 1, icon: 'person-add', active: ''}
    ];

    rootPage = TabsPage;

    constructor(private menu:MenuController, private platform:Platform, private events:Events,
                private userService:UserService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            this.menu.enable(true, 'navmenu');
            setTimeout(() => {
                Splashscreen.hide();
            }, 1000);
        });

        // Exit menu show for android device only
        if (platform.is('android')) {
            this.isExitBtnShow = true;
        }

        this.events.subscribe('ActiveMenuItem', (title) => {
            this.fnActiveMenuItem(title[0]);
        });
    }

    ngAfterViewInit() {
        let prevView = '', views = ['ContactDetailsPage'];
        this.nav.viewDidEnter.subscribe((data) => {
            if (prevView !== data.instance.constructor.name) {
                this.userService.getConfig().then((config) => {
                    let viewName = data.instance.constructor.name;
                    prevView = viewName;
                    if (config && config.token) {
                        if(views.indexOf(viewName) === -1){
                            Config.user._id = config.user._id;
                            Config.user.name = config.user.name;
                            this.nav.setRoot(ContactPage);
                        }
                    } else {
                        this.nav.setRoot(TabsPage);
                    }
                });
            }
        });
    }

    fnSignOut(){
        this.userService.setConfig(null);
        this.nav.setRoot(TabsPage);
    }

    fnOpenPage(page:PageObj) {
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});

        } else {
            this.nav.setRoot(page.component);
        }
        this.fnActiveMenuItem(page.title);
    }

    fnActiveMenuItem(title:string) {
        //1. Loop through and set active attribute to not color if it doesn't match.
        //   Set to color if it matches page titile
        for (var i = 0; i < this.appPages.length; i++) {
            if (this.appPages[i].title == title) this.appPages[i].active = '#387ef5';
            else this.appPages[i].active = '';
        }
    }

    fnExit() {
        this.platform.exitApp();
    }
}
