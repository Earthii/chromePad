import { SortNoteByDatePipe } from "./pipes/sort-note-by-date/sort-note-by-date.pipe";
import { SearchNotePipe } from "./pipes/search-note/search-note.pipe";
import { Component, OnInit } from "@angular/core";
import { Note } from "./models/Note";

import { ChromeStorageService } from "./services/chrome-storage/chrome-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  newNote: Note;
  notes: Note[];
  notesCache: Note[];
  previousNote: Note;
  activeNote: Note;
  typingTimeout;

  userIsTyping: Boolean;
  userIsSearching: Boolean;
  fromHandleViewNote: Boolean;
  fromHandleSearch: Boolean;

  constructor(
    private chromeStorage: ChromeStorageService,
    private searchNotePipe: SearchNotePipe,
    private sortNoteByDatePipe: SortNoteByDatePipe
  ) {
    this.newNote = null;
    this.notes = [];
    this.notesCache = this.notes;
    this.typingTimeout = undefined;
    this.userIsTyping = false;
    // TODO: alternative for safe navigation in note.component.html
    this.activeNote = {
      name: "Loading",
      content: "",
      id: "LOADING"
    };
  }

  ngOnInit() {
    // TODO: introduce observables
    this.chromeStorage.getAllNotes().then(notes => {
      this.notes = Object.values(notes);
      this.notes = this.sortNoteByDatePipe.transform(this.notes);

      this.notesCache = this.notes;
      if (this.notes.length === 0) {
        this.handleAddNote();
      } else {
        this.setActiveNote(this.notes[0]);
      }
    });
  }

  handleViewNote(note: Note) {
    // css prevents users to switch view while user is typing
    this.setActiveNote(note);
    this.fromHandleViewNote = true;
    console.log("View: " + note.id);
  }

  handleAddNote() {
    // Prevent user from typing and rapidly try to add new note
    if (this.newNote == null && !this.userIsTyping) {
      this.newNote = { name: "", content: "", id: "NEW" };
      this.notes.unshift(Object.assign({}, this.newNote));
      if (this.userIsSearching) {
        this.notesCache.unshift(this.notes[0]);
      } else {
        this.notesCache = this.notes;
      }
      this.setActiveNote(this.notes[0]);
    }
  }

  handleUpdateNote(note: Note) {
    // Prevent call to storage on start up, if notes
    // are already present in chrome storage
    if (this.previousNote.id === "LOADING" && note.id !== "NEW") {
      this.previousNote.id = "DONE LOADING";
      return;
    }

    // Prevent call to storage when simply switching note
    if (this.fromHandleViewNote || this.fromHandleSearch) {
      this.fromHandleViewNote = false;
      this.fromHandleSearch = false;
      return;
    }

    // New note has content now
    if (note.id === "NEW" && note.content !== "") {
      note.id = this.chromeStorage.generateNoteUuid();
      this.newNote = null;
    }

    if (note.id !== "NEW") {
      this.userIsTyping = true;
      // Prevent spaming chrome storage API
      if (this.typingTimeout !== undefined) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(() => {
        note.lastUpdated = this.chromeStorage.generateTimeStamp();
        this.chromeStorage.storeNote(note).then(() => {
          this.userIsTyping = false;
        });
      }, 400);
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

    this.chromeStorage.removeNote(note).then(() => {
      this.notes = this.notes.filter(item => item.id !== note.id);
      this.notesCache = this.notes;
      this.changeToDefaultActiveNote();
    });
  }

  handleChangeNoteName(note: Note) {
    if (note.id === "NEW") {
      this.newNote = null;
      note.id = this.chromeStorage.generateNoteUuid();
    }
    this.handleUpdateNote(note);
  }

  handleSearchNote(query: string) {
    this.fromHandleSearch = true;
    this.notes = this.notesCache;

    if (query !== "") {
      this.userIsSearching = true;

      this.notes = this.searchNotePipe.transform(this.notes, query);

      if (!this.notes[0]) {
        console.log("No search results found");
        if (this.notesCache[0].id !== "NEW" && this.notesCache.length > 1) {
          this.newNote = { name: "", content: "", id: "NEW" };
          this.notesCache.unshift(this.newNote);
        }
        this.notes.push(this.notesCache[0]);
        this.setActiveNote(this.notes[0]);
      } else {
        // search results found
        this.setActiveNote(this.notes[0]);
      }
    } else {
      this.userIsSearching = false;
      this.setActiveNote(this.notes[0]);
    }
  }

  private changeToDefaultActiveNote() {
    if (this.notes.length === 0) {
      this.handleAddNote();
    } else {
      this.setActiveNote(this.notes[0]);
    }
  }

  private setActiveNote(note: Note) {
    this.previousNote = this.activeNote;
    this.activeNote = note;
  }
}
