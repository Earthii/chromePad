import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";

import { SharedModule } from "./shared.module";

import { NoteComponent } from "./component/note/note.component";

import { SidebarModule } from "./component/sidebar/sidebar.module";

import { NgxWigModule } from "ngx-wig";

import { ChromeStorageService } from "./services/chrome-storage/chrome-storage.service";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { StripHtmlService } from "./services/strip-html/strip-html.service";
import { NoteManipulationService } from "./services/note-manipulation/note-manipulation.service";

@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [SharedModule, SidebarModule, NgxWigModule],
  providers: [
    ChromeStorageService,
    LocalStorageService,
    StripHtmlService,
    NoteManipulationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
