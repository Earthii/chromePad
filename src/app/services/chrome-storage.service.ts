/// <reference types="chrome"/>

import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";

@Injectable({
  providedIn: "root"
})
export class ChromeStorageService {
  constructor() {}

  storeNote(note) {
    const chromeNoteObj = {};
    chromeNoteObj[note.id] = note;
    chrome.storage.sync.set(chromeNoteObj, function() {});
  }

  getAllNotes() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(function(result) {
        resolve(result);
      });
    });
  }

  removeNote() {
    chrome.storage.sync.remove("test", function() {
      console.log("removed");
    });
  }

  generateNoteUuid() {
    return uuid();
  }
}
