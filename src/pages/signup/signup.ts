import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { SignInPage } from "../signin/signin";

@Component({
    selector: 'signup',
    templateUrl: 'signup.html'
})

export class SignUpPage {

    user: User;
    submitted = false;
    cPassword:string = "";

    constructor(public nav:NavController, private userService:UserService) {
        this.user = new User();
        this.user.name = "";
        this.user.email = "";
        this.user.password = "";
    }

    ionViewWillEnter() {
        this.submitted = false;
    }

    fnSignUp(form) {
        this.submitted = true;

        if (form.valid && this.user.password === this.cPassword) {
            this.userService.fnRegisterUser(this.user)
                .subscribe(
                (data) => {
                    this.nav.setRoot(SignInPage);
                },
                (error) => {});
        }
    }

}
