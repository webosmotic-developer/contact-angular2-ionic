import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { ContactPage } from "../contact/contact";

@Component({
    selector: 'signin',
    templateUrl: 'signin.html'
})

export class SignInPage {

    user: User;
    submitted = false;

    constructor(public nav:NavController, private userService:UserService) {
        this.user = new User();
        this.user.email = "";
        this.user.password = "";
    }

    ionViewWillEnter() {
        this.submitted = false;
    }

    fnSignIn(form) {
        this.submitted = true;

        if (form.valid) {
            this.userService.fnSignIn(this.user)
                .subscribe(
                (data) => {
                    this.nav.setRoot(ContactPage);
                },
                (error) => {});
        }
    }

}
