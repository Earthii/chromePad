import { Injectable } from "@angular/core";
import { Note } from "./../../models/Note";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() {}

  cache(notesToCache: Note[]) {
    localStorage.setItem("notes", JSON.stringify({ notes: notesToCache }));
  }
}
