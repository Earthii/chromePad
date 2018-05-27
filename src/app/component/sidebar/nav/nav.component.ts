import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { Note } from "../../../models/Note";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  @Input() notes: Note[];
  @Input() activeNote: Note;

  @Output() viewNoteEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleViewNote(note: Note) {
    this.viewNoteEvent.emit(note);
  }
}
