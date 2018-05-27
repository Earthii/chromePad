import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Note } from "../../models/Note";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent {
  @Input() activeNote: Note;
  @Output() updateNoteEvent: EventEmitter<Note> = new EventEmitter();

  updateNote() {
    this.updateNoteEvent.emit(this.activeNote);
  }
}
