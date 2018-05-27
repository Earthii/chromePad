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
      this.chromeStorage.storeNote(note);
      this.newNote = null;
    }
  }

  handleRemoveNote(note: Note) {
    this.notes = this.notes.filter(item => {
      if (this.notes.length === 1) {
        return item.id !== note.id || item.id === "NEW";
      } else {
        if (item.id === "NEW") {
          this.newNote = null;
        }
        return item.id !== note.id;
      }
    });

    this.chromeStorage.removeNote(note);
    console.log(this.notes);
    if (this.notes.length === 0) {
      this.handleAddNote();
    } else {
      this.activeNote = this.notes[0];
    }
  }

  handleChangeNoteName(note: Note) {
    if (note.id === "NEW") {
      this.newNote = null;
    }
    note.id = this.chromeStorage.generateNoteUuid();
    this.handleUpdateNote(note);
  }
}
