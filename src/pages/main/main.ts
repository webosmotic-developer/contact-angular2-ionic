import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { ContactPage } from "../contact/contact";

@Component({
    selector: 'main',
    templateUrl: 'main.html'
})

export class MainPage {

    page = "Sign In";
    user:User;
    signInSubmitted = false;
    signUpSubmitted = false;
    cPassword:string = "";
    error:string = "Test";

    constructor(public nav:NavController, private userService:UserService, private toast:ToastController) {
        this.user = new User();
        this.user.name = "";
        this.user.email = "";
        this.user.password = "";
    }

    ionViewWillEnter() {
        this.signInSubmitted = false;
        this.signUpSubmitted = false;
    }

    fnSignIn(form) {
        this.signInSubmitted = true;

        if (form.valid) {
            this.userService.fnSignIn(this.user)
                .subscribe(() => this.nav.setRoot(ContactPage),
                () => this.fnErrorToast("Invalid email and password."));
        }
    }

    fnSignUp(form) {
        this.signUpSubmitted = true;

        if (form.valid && this.user.password === this.cPassword) {
            this.userService.fnRegisterUser(this.user)
                .subscribe(() => this.page = "Sign In",
                () => this.fnErrorToast("The specified email address is already in use."));
        }
    }

    fnErrorToast = function (msg) {
        let toast = this.toast.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
