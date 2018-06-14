import { Component, OnInit } from "@angular/core";
import introJs from "intro.js";

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"]
})
export class HelpComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  startHelp() {
    const intro = introJs();
    intro.setOptions({
      hidePrev: true,
      hideNext: true,
      showStepNumbers: false,
      showButtons: true,
      showBullets: false, // use progress bar instead of bullets
      showProgress: true,
      steps: [
        {
          element: "#add-note-btn",
          intro: "Click this button to create a note"
        },
        {
          element: "#search-box",
          intro: "Use this search box to find your notes!"
        },
        {
          element: "#list-of-notes",
          intro: "You will find all your notes here",
          position: "right"
        },
        {
          element: document.querySelectorAll(".note-container")[0],
          intro: "Clicking on a note will display it",
          position: "right"
        },
        {
          element: "#remove-note-btn",
          intro: "Use this button to delete a note"
        }
      ]
    });
    intro.start();
  }
}
