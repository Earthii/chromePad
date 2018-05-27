/// <reference types="chrome"/>
import { Injectable } from "@angular/core";

/**
 * This service is used to call the chrome.storage API,
 * which is a better alternative than the localStorage API
 */
@Injectable({
  providedIn: "root"
})
export class TestServiceService {
  constructor() {}

  storeNote() {
    chrome.storage.sync.set({ test: "a" }, function() {
      console.log("Value is set to " + "a");
    });
  }

  getNote() {
    chrome.storage.sync.get(["test"], function(result) {
      console.log("Value currently is " + result.test);
    });
  }

  getAllNote() {
    chrome.storage.sync.get(function(result) {
      console.log(result);
    });
  }

  removeNote() {
    chrome.storage.sync.remove("test", function() {
      console.log("removed");
    });
  }
}
