import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  content: String;
  constructor() {}

  ngOnInit() {}
}
