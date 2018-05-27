import { Component, OnInit } from "@angular/core";

import { Note } from "./models/Note";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  newNote: Note;
  notes: Note[];
  activeNote: Note;

  constructor() {
    this.newNote = null;
    this.notes = [];
    // TODO: remove this, and replace with localStorage fetching data
    this.notes.push({ name: "note 1", content: "Hello World 1" });
    this.notes.push({ name: "note 2", content: "Hello World 2" });
    this.notes.push({ name: "note 3", content: "Hello World 3" });
    this.notes.push({ name: "note 4", content: "Hello World 4" });
    this.notes.push({ name: "note 5", content: "Hello World 5" });
    this.notes.push({ name: "note 6", content: "Hello World 6" });
    this.notes.push({ name: "note 7", content: "Hello World 7" });
    this.activeNote = this.notes[0];
  }

  ngOnInit() {}

  handleViewNote(note: Note) {
    this.activeNote = note;
  }

  handleAddNote() {
    if (this.newNote == null) {
      this.newNote = { name: "New Note", content: "" };
      this.notes.unshift(this.newNote);
    }
  }

  handleUpdateNote(note: Note) {
    console.log(note);
  }
}
