import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { Storage } from '@ionic/storage';

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
    constructor(private http:Http, private storage: Storage) {}

    fnRegisterUser(user:User):Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(Config.apiUrl + "/api/users",
            {
                name: user.name,
                email: user.email,
                password: user.password
            },
            {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    fnSignIn(user:User):Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(Config.apiUrl + "/auth/local", {
                email: user.email,
                password: user.password
            },
            {headers: headers})
            .map(response => response.json())
            .do(data => {
                Config.user._id = data.user._id;
                Config.user.name = data.user.name;
                this.setConfig(data);
            })
            .catch(this.handleError);
    }

    setConfig(token) {
        this.storage.set('config', token);
    }

    getConfig() {
        return this.storage.get('config').then((value) => {
            return value;
        });
    }


    private extractData(res:Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
