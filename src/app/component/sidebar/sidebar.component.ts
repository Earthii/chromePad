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
    this.notes.push({ name: "note 1" });
    this.notes.push({ name: "note 2" });
    this.notes.push({ name: "note 3" });
    this.notes.push({ name: "note 4" });
  }

  handleAddNote() {
    console.log("handle add note");
    if (this.newNote == null) {
      this.newNote = { name: "" };
      this.notes.unshift(this.newNote);
    }
  }
}
