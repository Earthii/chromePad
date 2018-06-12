/// <reference types="chrome"/>

import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";
import { Note } from "../../models/Note";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChromeStorageService {
  constructor() {}

  storeNote(note) {
    const chromeNoteObj = {};
    chromeNoteObj[note.id] = note;
    return new Promise(resolve => {
      chrome.storage.sync.set(chromeNoteObj, function() {
        console.log("Updated/stored note: ", note);
        resolve();
      });
    });
  }

  getAllNotes() {
    return new Promise(resolve => {
      chrome.storage.sync.get(function(result) {
        resolve(Object.values(result));
      });
    });
  }

  removeNote(note: Note) {
    return new Promise(resolve => {
      chrome.storage.sync.remove(note.id, function() {
        console.log("removed " + note.id);
        resolve();
      });
    });
  }

  generateNoteUuid() {
    return uuid();
  }

  generateTimeStamp() {
    return Date.now();
  }
}
