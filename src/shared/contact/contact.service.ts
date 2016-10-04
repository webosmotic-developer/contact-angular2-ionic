import { Injectable } from "@angular/core";
import { Contact } from "./contact";

let contacts = [{
    "_id": "57ecf79374384f1100889d0c",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9898456514"
}, {
    "_id": "6d482059-b166-b97d-8d48-3a2f4fcd6cba",
    "name": "Mary Moe",
    "email": "mary@example.com",
    "phone": "9898451114"
}, {
    "_id": "0e60c9d6-8376-2474-579e-61e9ab482900",
    "name": "July Dooley",
    "email": "july@example.com",
    "phone": "9898451224"
}];

@Injectable()
export class ContactService {
    constructor() {
    }

    guid() {
        let s4 = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4 + s4 + '-' + s4 + '-' + s4 + '-' + s4 + '-' + s4 + s4 + s4;
    }

    load() {
        return contacts;
    }

    get(id:string) {
        var index = contacts.map(function (obj) {
            return obj._id;
        }).indexOf(id);
        if (index > -1) {
            return contacts[index];
        }
    }

    add(contact:Contact) {
        contact._id = this.guid();
        contacts.push(contact);
    }

    update(contact:Contact) {
        var index = contacts.map(function (obj) {
            return obj._id;
        }).indexOf(contact._id);
        if (index > -1) {
            contacts[index] = contact;
        }
    }

    delete(id:string) {
        var index = contacts.map(function (obj) {
            return obj._id;
        }).indexOf(id);
        if (index > -1) {
            contacts.splice(index, 1);
        }
    }
}
