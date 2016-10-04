import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ContactDetailsPage } from "../contact.details/contact.details";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [ContactService]
})

export class ContactPage implements OnInit{

    contact:Contact;
    contactList:Array<Contact> = [];

    constructor(public nav:NavController, private contactService:ContactService) {
        this.contact = new Contact();
        this.contact.name = "";
    }

    ngOnInit() {
        var data = this.contactService.load();
        data.forEach((obj) => {
            this.contactList.unshift(obj);
        });
    }

    goTo(event, contact) {
        this.nav.push(ContactDetailsPage, {
            contact: contact
        });
    }
}
