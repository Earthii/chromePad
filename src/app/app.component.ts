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
  newNote: Note; // the reference to the new note
  notes: Note[]; // the notes that are displayed in the navigation
  notesCache: Note[]; // the cache used mainly for searching feature (prevent call to storage API)
  previousNote: Note; // the previous active note
  activeNote: Note; // the active note
  typingTimeout; // timeout to control call storage API after user stops typing
  // flags to control UI, and business flow
  userIsTyping: Boolean;
  userIsSearching: Boolean;

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
    this.chromeStorage.getAllNotes().then(notes => {
      this.notes = Object.values(notes);
      this.notes = this.sortNoteByDatePipe.transform(this.notes); // initially, sort notes by dates
      this.notesCache = this.notes; // notes cache will have the safe reference as notes
      if (this.notes.length === 0) {
        this.handleAddNote(); // If there is no existing notes, put by default a new note
      } else {
        this.setActiveNote(this.notes[0]); // else select the first as default
      }
    });
  }

  handleViewNote(note: Note) {
    // prevent spamming the same note
    if (this.activeNote !== note) {
      this.setActiveNote(note);
      console.log("View: " + note.id);
    }
  }

  handleAddNote() {
    // Prevent user from typing and rapidly try to add new note
    if (this.newNote == null && !this.userIsTyping) {
      this.newNote = { name: "", content: "", id: "NEW" };
      this.notes.unshift(Object.assign({}, this.newNote));

      if (this.userIsSearching) {
        console.log(1);
        this.notesCache.unshift(this.notes[0]);
      } else {
        console.log(2);
        this.notesCache = this.notes;
      }
      console.log(this.notesCache);
      this.setActiveNote(this.notes[0]);
    }
  }

  handleUpdateNote(note: Note) {
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
    this.notes = this.notesCache; // reset same reference
    if (query !== "") {
      this.userIsSearching = true;
      // allow add -> search existing -> add
      if (this.notesCache[0].id === "NEW") {
        this.notesCache.shift();
        this.newNote = null;
      }
      this.notes = this.searchNotePipe.transform(this.notes, query); // obtains new references
      if (!this.notes[0]) {
        // No search results found
        if (this.notesCache[0].id !== "NEW") {
          // Add newNote to cache
          this.newNote = { name: "", content: "", id: "NEW" };
          this.notesCache.unshift(this.newNote);
        }
        this.notes.push(this.notesCache[0]); // display new note option
      }
    } else {
      this.userIsSearching = false;
    }
    this.setActiveNote(this.notes[0]);
  }

  /**
   * HELPER METHODS
   */
  private changeToDefaultActiveNote() {
    if (this.notes.length === 0) {
      this.handleAddNote();
    } else {
      this.setActiveNote(this.notes[0]);
    }
  }

  private setActiveNote(note: Note) {
    // dont let user spam the same note
    this.previousNote = { ...this.activeNote };
    this.activeNote = note;
  }
}
