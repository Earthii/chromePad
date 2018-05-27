import { Component, OnInit, Input } from "@angular/core";
import { Note } from "../../../../models/Note";

@Component({
  selector: "app-preview-note",
  templateUrl: "./preview-note.component.html",
  styleUrls: ["./preview-note.component.scss"]
})
export class PreviewNoteComponent implements OnInit {
  @Input() note: Note;

  constructor() {}

  ngOnInit() {}
}
