import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrls: ["./controls.component.scss"]
})
export class ControlsComponent {
  @Output() addNoteEvent: EventEmitter<any> = new EventEmitter();
  @Output() searchNoteEvent: EventEmitter<String> = new EventEmitter();

  constructor() {}

  addNote() {
    this.addNoteEvent.emit();
  }

  doSearch(query) {
    this.searchNoteEvent.emit(query);
  }
}
