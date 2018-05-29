import { Component, OnInit } from "@angular/core";
import { Note } from "./models/Note";

import { ChromeStorageService } from "./services/chrome-storage/chrome-storage.service";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { NoteManipulationService } from "./services/note-manipulation/note-manipulation.service";
import { __core_private_testing_placeholder__ } from "@angular/core/testing";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  newNote: Note;
  notesInSideBar: Note[];
  notesCache: Note[];
  activeNote: Note;
  searchingState: Boolean;

  constructor(
    private chromeStorage: ChromeStorageService,
    private localStorageCache: LocalStorageService,
    private noteManipulationService: NoteManipulationService
  ) {
    this.newNote = null;
    this.notesInSideBar = [];
    this.searchingState = false;
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
      this.notesInSideBar = Object.values(notes);
      this.setNotesCache(this.notesInSideBar);
      if (this.notesInSideBar.length === 0) {
        this.handleAddNote();
      } else {
        this.activeNote = this.notesInSideBar[0];
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
      this.notesInSideBar.unshift(Object.assign({}, this.newNote));
      this.setNotesCache(this.notesInSideBar);
      this.activeNote = this.notesInSideBar[0];
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
      this.noteManipulationService.buildPreviewMessage(note);
      // this.chromeStorage.storeNote(note);
      this.localStorageCache.cache(this.notesCache);
      this.newNote = null;
    }
  }

  handleRemoveNote(note: Note) {
    if (note.id === "NEW") {
      // Do not remove NEW if there is only NEW
      if (this.notesInSideBar.length === 1) {
        return;
      } else {
        this.newNote = null;
      }
    }

    this.notesInSideBar = this.notesInSideBar.filter(
      item => item.id !== note.id
    );
    this.setNotesCache(this.notesInSideBar);
    this.chromeStorage.removeNote(note);

    this.changeToDefaultActiveNote();
  }

  handleChangeNoteName(note: Note) {
    if (note.id === "NEW") {
      this.newNote = null;
      note.id = this.chromeStorage.generateNoteUuid();
    }
    this.handleUpdateNote(note);
  }

  handleSearchNote(query: string) {
    this.notesInSideBar = this.notesCache;
    if (query !== "") {
      this.searchingState = true;
      this.notesInSideBar = this.notesInSideBar.filter(item => {
        const inName = item.name.includes(query);
        const inContent = item.content.includes(query);
        return inName || inContent;
      });

      this.activeNote = this.notesInSideBar[0];

      if (!this.activeNote) {
        console.log("No search results found");
        if (this.notesCache[0].id !== "NEW" && this.notesCache.length > 1) {
          this.newNote = { name: "New Note", content: "", id: "NEW" };
          this.notesCache.unshift(this.newNote);
        }
        this.notesInSideBar.push(this.notesCache[0]);
        this.activeNote = this.notesInSideBar[0];
      }
    } else {
      this.searchingState = false;
      this.activeNote = this.notesInSideBar[0];
    }
  }

  private changeToDefaultActiveNote() {
    if (this.notesInSideBar.length === 0) {
      this.handleAddNote();
    } else {
      this.activeNote = this.notesInSideBar[0];
    }
  }

  private setNotesCache(notes: Note[]) {
    this.notesCache = notes;
    const notesToCacheToLocalStorage = Object.assign([], this.notesCache);
    if (notesToCacheToLocalStorage.length > 0) {
      if (notesToCacheToLocalStorage[0].id === "NEW") {
        notesToCacheToLocalStorage.shift();
      }
    }
    this.localStorageCache.cache(notesToCacheToLocalStorage);
  }
}
