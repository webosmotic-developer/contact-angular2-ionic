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
}, {
    "_id": "57f3b0a630d241f7b18759e2",
    "picture": "http://placehold.it/32x32",
    "name": "Coleen Flowers",
    "email": "coleenflowers@quarmony.com",
    "phone": "9898451224"
}, {
    "_id": "57f3b0a637deeddfe24a2789",
    "picture": "http://placehold.it/32x32",
    "name": "Francine Mccarthy",
    "email": "francinemccarthy@quarmony.com",
    "phone": "9898451224"
}, {
    "_id": "57f3b0a6628391a5cd23b3ff",
    "picture": "http://placehold.it/32x32",
    "name": "Guadalupe Randall",
    "email": "guadaluperandall@quarmony.com",
    "phone": "98986463424"
}, {
    "_id": "57f3b0a6d5f6453002fe0d66",
    "picture": "http://placehold.it/32x32",
    "name": "Frost Henderson",
    "email": "frosthenderson@quarmony.com",
    "phone": "98878751224"
}, {
    "_id": "57f3b0a6c7bde121c26673a5",
    "picture": "http://placehold.it/32x32",
    "name": "Jarvis Perkins",
    "email": "jarvisperkins@quarmony.com",
    "phone": "98984518888"
}, {
    "_id": "57f3b0a695b6ecd7d583291a",
    "picture": "http://placehold.it/32x32",
    "name": "Bridges Webster",
    "email": "bridgeswebster@quarmony.com",
    "phone": "989844326724"
}, {
    "_id": "57f3b0a6e1776b3b97c7f8a9",
    "picture": "http://placehold.it/32x32",
    "name": "Blackwell Ramirez",
    "email": "blackwellramirez@quarmony.com",
    "phone": "989845544646"
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
