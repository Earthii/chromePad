import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";

import { SharedModule } from "./shared.module";

import { NoteComponent } from "./component/note/note.component";

import { SidebarModule } from "./component/sidebar/sidebar.module";

import { NgxWigModule } from "ngx-wig";

import { ChromeStorageService } from "./services/chrome-storage/chrome-storage.service";
import { StripHtmlService } from "./services/strip-html/strip-html.service";

@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [SharedModule, SidebarModule, NgxWigModule],
  providers: [ChromeStorageService, StripHtmlService],
  bootstrap: [AppComponent]
})
export class AppModule {}
