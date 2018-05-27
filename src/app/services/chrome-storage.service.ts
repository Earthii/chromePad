/// <reference types="chrome"/>

import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";
import { Note } from "../models/Note";

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

  removeNote(note: Note) {
    chrome.storage.sync.remove(note.id, function() {
      console.log("removed " + note.id);
    });
  }

  generateNoteUuid() {
    return uuid();
  }
}
