import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { ContactDetailsPage } from "../contact.details/contact.details";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [ContactService]
})

export class ContactPage {

    loader;
    isContactsLoaded = false;
    contact:Contact;
    contactList:Array<Contact> = [];

    constructor(public nav:NavController, public loading: LoadingController, private contactService:ContactService) {
        this.contact = new Contact();
        this.contact.name = "";
    }

    fnLoading() {
        this.loader = this.loading.create({
            content: "Please wait...",
            duration: 1000 * 60 * 60
        });
        this.loader.present();
    }

    //ionViewLoaded
    //ionViewWillEnter
    //ionViewDidEnter
    //ionViewWillLeave
    //ionViewDidLeave
    //ionViewWillUnload
    //ionViewDidUnload

    ionViewWillEnter() {
        this.fnGetUserContacts();
    }

    fnGetUserContacts(){
        this.fnLoading();
        this.isContactsLoaded = false;
        this.contactService.fnGetUserContacts()
            .subscribe(data => {
                data.forEach((obj) => {
                    this.contactList.unshift(obj);
                });
                this.isContactsLoaded = true;
                this.loader.dismissAll();
            },() => {
                this.loader.dismissAll();
            });
    }

    fnSearch(ev: any) {
        this.contactService.fnGetUserContacts()
            .subscribe(data => {
                // set val to the value of the searchbar
                let val = ev.target.value;

                // if the value is an empty string don't filter the items
                if (val && val.trim() != '') {
                    data = data.filter((item) => {
                        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    });
                }
                this.contactList = data.reverse();
            });
    }

    fnGoTo(event, contact) {
        this.nav.push(ContactDetailsPage, {
            contact: contact
        });
    }
}
