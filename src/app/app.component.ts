import { Component, OnInit } from "@angular/core";
import { ChromeStorageService } from "./services/chrome-storage.service";
import { Note } from "./models/Note";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  newNote: Note;
  notes: Note[];
  activeNote: Note;

  constructor(private chromeStorage: ChromeStorageService) {
    this.newNote = null;
    this.notes = [];
    // TODO: alternative for safe navigation in note.component.html
    this.activeNote = {
      name: "Loading",
      content: "Currently fetching list of notes",
      id: "LOADING"
    };
  }

  ngOnInit() {
    // TODO: introduce observables
    this.chromeStorage.getAllNotes().then(notes => {
      this.notes = Object.values(notes);
      if (this.notes.length === 0) {
        this.handleAddNote();
      } else {
        this.activeNote = this.notes[0];
      }
    });
  }

  handleViewNote(note: Note) {
    this.activeNote = note;
    console.log("View: " + note.id);
  }

  handleAddNote() {
    if (this.newNote == null) {
      this.newNote = { name: "New Note", content: "", id: "NEW" };
      this.notes.unshift(Object.assign({}, this.newNote));
      this.activeNote = this.notes[0];
    }
  }

  handleUpdateNote(note: Note) {
    // TODO: fix work around, ngx-wig contentChange event is fired when it shouldn't
    if (note.id === "NEW") {
      if (note.content !== "") {
        note.id = this.chromeStorage.generateNoteUuid();
      }
    }

    if (note.id !== "NEW" && note.id !== "LOADING") {
      this.buildPreviewMsg(note);
      this.chromeStorage.storeNote(note);
      this.newNote = null;
    }
  }

  handleRemoveNote(note: Note) {
    if (note.id === "NEW") {
      // Do not remove NEW if there is only NEW
      if (this.notes.length === 1) {
        return;
      } else {
        this.newNote = null;
      }
    }

    this.notes = this.notes.filter(item => item.id !== note.id);

    this.chromeStorage.removeNote(note);

    this.changeToDefaultActiveNote();
  }

  handleChangeNoteName(note: Note) {
    if (note.id === "NEW") {
      this.newNote = null;
    }
    note.id = this.chromeStorage.generateNoteUuid();
    this.handleUpdateNote(note);
  }

  private changeToDefaultActiveNote() {
    if (this.notes.length === 0) {
      this.handleAddNote();
    } else {
      this.activeNote = this.notes[0];
    }
  }

  handleSearchNote(query: string) {
    console.log(query);
  }

  private buildPreviewMsg(note: Note) {
    // keep only the first 50 characters for preview
    const previewMsg = note.content.substring(0, 50);
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
