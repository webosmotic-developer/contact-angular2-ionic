import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { ContactDetailsPage } from "../contact.details/contact.details";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [ContactService]
})

export class ContactPage implements OnInit {

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

    ngOnInit() {
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

    fnGoTo(event, contact) {
        this.nav.push(ContactDetailsPage, {
            contact: contact
        });
    }
}
