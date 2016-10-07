import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ContactPage } from "../contact/contact";
import { Contact } from "../../shared/contact/contact";
import { ContactService } from "../../shared/contact/contact.service";

@Component({
    selector: 'page-contact-details',
    templateUrl: 'contact-details.html',
    providers: [ContactService]
})

export class ContactDetailsPage{

    loader;
    contact:Contact;
    form: FormGroup;
    submitAttempt: boolean = false;

    constructor(public nav:NavController, public params:NavParams, public loading: LoadingController,
                public alert: AlertController, public fbld: FormBuilder, private contactService:ContactService,
                public events: Events) {
        this.contact = this.params.get('contact') ? this.params.get('contact') : new Contact();

        this.form = this.fbld.group({
            name: ['',[Validators.required]],
            email:['',[Validators.compose([Validators.required])]],
            phone:['',[Validators.required]]
        });

        if(this.params.get('contact')){
            (<FormControl>this.form.controls['name'])
                .setValue(this.contact.name, { onlySelf: true });

            (<FormControl>this.form.controls['email'])
                .setValue(this.contact.email, { onlySelf: true });

            (<FormControl>this.form.controls['phone'])
                .setValue(this.contact.phone, { onlySelf: true });
        }
    }

    ionViewWillEnter() {
        this.submitAttempt = false;
    }

    fnOnSubmit() {
        this.submitAttempt = true;
        if(this.form.valid){
            this.submitAttempt = false;
            this.contact.name = this.form.value.name;
            this.contact.email= this.form.value.email;
            this.contact.phone= this.form.value.phone;
            this.fnSaveContact();
        }
    }

    fnLoading() {
        this.loader = this.loading.create({
            content: "Please wait...",
            duration: 1000 * 60 * 60
        });
        this.loader.present();
    }


    fnSaveContact() {
        this.fnLoading();
        if (!this.contact._id) {
            this.contactService.fnAddContact(this.contact)
                .subscribe(() => {
                    this.contact = new Contact();
                    this.loader.dismissAll();
                    this.events.publish('ActiveMenuItem', 'Contact List');
                    this.nav.setRoot(ContactPage);
                },() => {
                    this.loader.dismissAll();
                });
        } else {
            this.contactService.fnUpdateContact(this.contact)
                .subscribe(() => {
                    this.contact = new Contact();
                    this.loader.dismissAll();
                    this.events.publish('ActiveMenuItem', 'Contact List');
                    this.nav.setRoot(ContactPage);
                },() => {
                    this.loader.dismissAll();
                });
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
                        this.fnLoading();
                        this.contactService.fnDeleteContact(id)
                            .subscribe(data => {
                                this.loader.dismissAll();
                                this.events.publish('ActiveMenuItem', 'Contact List');
                                this.nav.setRoot(ContactPage);
                            },
                            error => {
                                this.loader.dismissAll();
                                this.events.publish('ActiveMenuItem', 'Contact List');
                                this.nav.setRoot(ContactPage);
                            });

                    }
                }
            ]
        });
        confirm.present();
    }

}
