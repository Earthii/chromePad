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
  @Input() userIsTyping: boolean;

  @Output() viewNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() addNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() removeNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() changeNoteNameEvent: EventEmitter<Note> = new EventEmitter();
  @Output() searchNoteEvent: EventEmitter<String> = new EventEmitter();

  constructor() {}

  handleAddNote() {
    this.addNoteEvent.emit();
  }

  handleViewNote(note: Note) {
    this.viewNoteEvent.emit(note);
  }

  handleRemoveNote(note: Note) {
    if (!this.userIsTyping) {
      this.removeNoteEvent.emit(note);
    }
  }

  handleChangeNoteName(note: Note) {
    this.changeNoteNameEvent.emit(note);
  }

  handleSearchNote(query: string) {
    this.searchNoteEvent.emit(query);
  }
}
