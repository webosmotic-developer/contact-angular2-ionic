import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Config } from "../config";
import { Contact } from "./contact";

@Injectable()
export class ContactService {
    constructor(private http:Http) {
    }

    fnGetUserContacts():Observable<Contact[]> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.get(Config.apiUrl + "/api/users/" + Config.user._id + "/contacts", {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    fnGetContact(id:string):Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.get(Config.apiUrl + "/api/contacts/" + id, {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    fnAddContact(contact:Contact):Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.post(Config.apiUrl + "/api/contacts", {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            userId: Config.user._id
        }, {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    fnUpdateContact(contact:Contact):Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.put(Config.apiUrl + "/api/contacts/" + contact._id, {
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        }, {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    fnDeleteContact(id:string):Observable<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.delete(Config.apiUrl + "/api/contacts/" + id,
            {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
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
