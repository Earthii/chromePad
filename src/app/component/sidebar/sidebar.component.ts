import { Component, OnInit } from "@angular/core";

import { Note } from "../../models/Note";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  notes: Note[];

  newNote: Note;

  constructor() {
    this.notes = [];
    this.newNote = null;
  }

  ngOnInit() {
    // TODO: remove this, and replace with localStorage fetching data
    this.notes.push({ name: "note 1" });
    this.notes.push({ name: "note 2" });
    this.notes.push({ name: "note 3" });
    this.notes.push({ name: "note 4" });
  }

  handleAddNote() {
    if (this.newNote == null) {
      this.newNote = { name: "New Note" };
      this.notes.unshift(this.newNote);
    }
  }
}
