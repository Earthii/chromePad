import { StripHtmlService } from "./../strip-html/strip-html.service";
import { Injectable } from "@angular/core";
import { Note } from "./../../models/Note";

@Injectable({
  providedIn: "root"
})
export class NoteManipulationService {
  constructor(private stripHtmlService: StripHtmlService) {}

  buildPreviewMessage(note: Note) {
    // keep only the first 50 characters for preview
    const contentStripedOfNbsp = this.stripHtmlService.removeHtmlFromString(
      note.content
    );
    const previewMsg = contentStripedOfNbsp.substring(0, 50);

    if (previewMsg !== "") {
      note.preview = previewMsg;
      if (previewMsg.length === 50) {
        note.preview += " ...";
      }
    } else {
      note.preview = "";
    }
  }
}
