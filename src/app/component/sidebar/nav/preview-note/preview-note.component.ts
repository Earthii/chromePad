import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Note } from "../../../../models/Note";

@Component({
  selector: "app-preview-note",
  templateUrl: "./preview-note.component.html",
  styleUrls: ["./preview-note.component.scss"]
})
export class PreviewNoteComponent {
  @Input() note: Note;

  @Output() viewNoteEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  viewNote() {
    this.viewNoteEvent.emit(this.note);
  }
}
