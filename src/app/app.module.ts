import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "./shared.module";

import { NoteComponent } from "./component/note/note.component";

import { SidebarModule } from "./component/sidebar/sidebar.module";
import { QuillModule } from "ngx-quill";

import { ChromeStorageService } from "./services/chrome-storage/chrome-storage.service";
import { SearchNotePipe } from "./pipes/search-note/search-note.pipe";
import { SortNoteByDatePipe } from "./pipes/sort-note-by-date/sort-note-by-date.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    SearchNotePipe,
    SortNoteByDatePipe
  ],
  imports: [SharedModule, SidebarModule, QuillModule],
  providers: [ChromeStorageService, SearchNotePipe, SortNoteByDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
