import { Component, OnInit, Input } from "@angular/core";

import { Note } from "../../../models/Note";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  @Input() notes: Note[];

  constructor() {}

  ngOnInit() {}
}
