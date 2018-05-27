import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Note } from "../../models/Note";
import { notDeepStrictEqual } from "assert";
import { NotExpr } from "@angular/compiler";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input() activeNote: Note;
  @Input() notes: Note[];

  @Output() viewNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() addNoteEvent: EventEmitter<Note> = new EventEmitter();

  constructor() {}

  handleAddNote() {
    this.addNoteEvent.emit();
  }

  handleViewNote(note: Note) {
    this.viewNoteEvent.emit(note);
  }
}
