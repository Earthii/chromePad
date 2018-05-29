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

  editorModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"]
    ]
  };

  updateNote(event) {
    // TODO: if statement avoids ExpressionChangedAfterItHasBeenCheckedError
    if (this.activeNote.id !== "LOADING") {
      if (event.html === null) {
        this.activeNote.content = "";
      } else {
        this.activeNote.content = event.html;
      }
      this.updateNoteEvent.emit(this.activeNote);
    }
  }

  logSelection(event) {
    console.log(event);
  }
}
