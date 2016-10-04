import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

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

    constructor(public nav:NavController, public params:NavParams, private contactService:ContactService) {
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
        let result = confirm("Are you sure you want delete this contact?");
        if (result) {
            this.contactService.delete(id);
            this.nav.push(ContactPage);
        }
    }

}
