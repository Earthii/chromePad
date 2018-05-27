import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Note } from "../../../../models/Note";

@Component({
  selector: "app-preview-note",
  templateUrl: "./preview-note.component.html",
  styleUrls: ["./preview-note.component.scss"]
})
export class PreviewNoteComponent {
  @Input() note: Note;
  @Input() active: Boolean;

  @Output() viewNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() removeNoteEvent: EventEmitter<Note> = new EventEmitter();
  @Output() changeNoteNameEvent: EventEmitter<Note> = new EventEmitter();

  constructor() {}

  viewNote() {
    this.viewNoteEvent.emit(this.note);
  }

  removeNote() {
    this.removeNoteEvent.emit(this.note);
  }

  changeNoteName(newName) {
    this.note.name = newName;
    this.changeNoteNameEvent.emit(this.note);
  }
}
