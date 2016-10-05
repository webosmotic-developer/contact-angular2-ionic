import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

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

    constructor(public nav:NavController, public params:NavParams, public toast: ToastController,
                public alert: AlertController, private contactService:ContactService) {
        this.contact = this.params.get('contact') ? this.params.get('contact') : new Contact();
    }

    fnValidateEmail(email:string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    fnValidatePhone(phone:string) {
        var re = /^\d{10}$/;
        return re.test(phone);
    }

    fnSaveContact() {
        if (!this.contact.name) {
            alert("Name is required.");
        } else if (!this.contact.email) {
            alert("Email is required.");
        } else if (this.contact.email && !this.fnValidateEmail(this.contact.email)) {
            alert("Enter valid email.");
        } else if (!this.contact.phone) {
            alert("Phone is required with numeric value.");
        } else if (this.contact.phone && !this.fnValidatePhone(this.contact.phone)) {
            alert("Enter valid 10 digits number.");
        } else {
            if (!this.contact._id) {
                this.contactService.fnAddContact(this.contact)
                    .subscribe(() => {
                        this.fnToast('Contact created.');
                        this.contact = new Contact();
                        this.nav.push(ContactPage);
                    });
            } else {
                this.contactService.fnUpdateContact(this.contact)
                    .subscribe(() => {
                        this.fnToast('Contact updated.');
                        this.contact = new Contact();
                        this.nav.push(ContactPage);
                    });
            }
        }
    }

    fnDeleteContact(id:string){
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
                        this.contactService.fnDeleteContact(id)
                            .subscribe(data => this.nav.push(ContactPage),
                            error => this.nav.push(ContactPage));

                    }
                }
            ]
        });
        confirm.present();
    }

    fnToast(msg:string){
        let toast = this.toast.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

}
