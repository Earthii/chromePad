import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrls: ["./controls.component.scss"]
})
export class ControlsComponent implements OnInit {
  @Output() addNoteEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  addNote() {
    console.log("add note");
    this.addNoteEvent.emit();
  }
}
