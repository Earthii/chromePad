import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  title = "chromePad";
  constructor() {}

  ngOnInit() {}
  handleClick() {
    console.log("hello world");
  }
}
