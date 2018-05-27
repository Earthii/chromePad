import { Component, OnInit } from "@angular/core";
import { TestServiceService } from "./services/test-service.service";

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

  constructor(private service: TestServiceService) {
    this.newNote = null;
    this.notes = [];
    this.activeNote = null;
  }

  ngOnInit() {
    // TODO: remove this, and replace with localStorage fetching data

    this.activeNote = this.notes[0];
  }

  handleViewNote(note: Note) {
    this.activeNote = note;
  }

  handleAddNote() {
    if (this.newNote == null) {
      this.newNote = { name: "New Note", content: "" };
      this.notes.unshift(this.newNote);
      this.activeNote = this.newNote;
    }
  }

  handleUpdateNote(note: Note) {}
}
