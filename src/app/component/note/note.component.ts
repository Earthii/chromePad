import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Note } from "../../models/Note";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent {
  @Input()
  set activeNote(note: Note) {
    console.log("set active note", note);
    note.id === "NEW" ? (this.noteLoaded = true) : (this.noteLoaded = false);
    this._activeNote = note;
  }
  @Input() userIsTyping: Boolean;
  @Output() updateNoteEvent: EventEmitter<Note> = new EventEmitter();
  _activeNote: Note;
  noteLoaded = false;

  editor: any;

  editorModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"], // "code-block" removed until fix
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
    console.log("update");
    if (!this.noteLoaded) {
      this.noteLoaded = true;
      console.log("skip");
      return;
    }
    if (event.html === null) {
      this._activeNote.content = "";
    } else {
      this._activeNote.content = event.html;
    }
    this.updateNoteEvent.emit(this._activeNote);
  }

  editorCreated($event) {
    this.editor = $event;
  }
}
