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
  searchQuery: String;

  @Output() viewNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() addNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() removeNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() changeNoteNameEvent: EventEmitter<Note> = new EventEmitter();
  @Output() searchNoteEvent: EventEmitter<String> = new EventEmitter();

  constructor() {
    this.searchQuery = "";
  }

  handleAddNote() {
    this.addNoteEvent.emit();
  }

  handleViewNote(note: Note) {
    this.viewNoteEvent.emit(note);
  }

  handleRemoveNote(note: Note) {
    this.removeNoteEvent.emit(note);
  }

  handleChangeNoteName(note: Note) {
    this.changeNoteNameEvent.emit(note);
  }

  handleSearchNote(query: string) {
    this.searchQuery = query;
    // this.searchNoteEvent.emit(query);
  }
}
