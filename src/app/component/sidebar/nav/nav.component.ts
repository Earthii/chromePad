import { Component, Input, EventEmitter, Output } from "@angular/core";

import { Note } from "../../../models/Note";
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent {
  @Input() notes: Note[];
  @Input() activeNote: Note;
  @Input() userIsTyping: boolean;

  @Output() viewNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() removeNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() changeNoteNameEvent: EventEmitter<Note> = new EventEmitter();

  constructor() {}

  handleViewNote(note: Note) {
    this.viewNoteEvent.emit(note);
  }

  handleRemoveNote(note: Note) {
    this.removeNoteEvent.emit(note);
  }

  handleChangeNoteName(note: Note) {
    this.changeNoteNameEvent.emit(note);
  }
}
