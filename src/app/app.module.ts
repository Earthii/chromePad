import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";

import { SharedModule } from "./shared.module";

import { NoteComponent } from "./component/note/note.component";

import { SidebarModule } from "./component/sidebar/sidebar.module";
import { QuillModule } from "ngx-quill";

import { ChromeStorageService } from "./services/chrome-storage/chrome-storage.service";
@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [SharedModule, SidebarModule, QuillModule],
  providers: [ChromeStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
