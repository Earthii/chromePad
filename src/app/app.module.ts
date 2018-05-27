import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";

import { SharedModule } from "./shared.module";

import { NoteComponent } from "./component/note/note.component";

import { SidebarModule } from "./component/sidebar/sidebar.module";

import { NgxWigModule } from "ngx-wig";

@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [SharedModule, SidebarModule, NgxWigModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
