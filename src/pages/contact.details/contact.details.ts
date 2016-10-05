import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ContactPage } from "../contact/contact";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: 'page-contact-details',
    templateUrl: 'contact-details.html',
    providers: [ContactService]
})

export class ContactDetailsPage{

    contact:Contact;

    constructor(public nav:NavController, public params:NavParams, public alert: AlertController, private contactService:ContactService) {
        this.contact = this.params.get('contact') ? this.params.get('contact') : new Contact();
    }

    saveContact() {
        if (!this.contact.name) {
            alert("Name is required.");
        } else if (!this.contact.email) {
            alert("Email is required.");
        } else if (!this.contact.phone) {
            alert("Phone is required.");
        } else {
            if (!this.contact._id) {
                this.contactService.add(this.contact);
            } else {
                this.contactService.update(this.contact);
            }
            this.contact = new Contact();
            this.nav.push(ContactPage);
        }
    }

    deleteContact(id:string){
        let confirm = this.alert.create({
            title: 'Delete',
            message: 'Are you sure you want delete this contact?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {}
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.contactService.delete(id);
                        this.nav.push(ContactPage);
                    }
                }
            ]
        });
        confirm.present();
    }

}
