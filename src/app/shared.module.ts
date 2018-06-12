import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { SortNoteByDatePipe } from "./pipes/sort-note-by-date/sort-note-by-date.pipe";
import { StripHtmlPipe } from "./pipes/strip-html/strip-html.pipe";
import { SearchNotePipe } from "./pipes/search-note/search-note.pipe";

@NgModule({
  declarations: [SortNoteByDatePipe, StripHtmlPipe, SearchNotePipe],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SortNoteByDatePipe,
    StripHtmlPipe,
    SearchNotePipe
  ]
})
export class SharedModule {}
