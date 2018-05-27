/// <reference types="chrome"/>
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChromeStorageService {
  constructor() {}

  storeNote() {
    chrome.storage.sync.set({ test: "a" }, function() {
      console.log("Value is set to " + "a");
    });
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
}
