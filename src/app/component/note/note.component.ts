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

  updateNote(event) {
    // TODO: if statement avoids ExpressionChangedAfterItHasBeenCheckedError
    if (this.activeNote.id !== "LOADING") {
      this.activeNote.content = event;
      this.updateNoteEvent.emit(this.activeNote);
    }
  }
}
