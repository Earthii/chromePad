import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";

import { SharedModule } from "./shared.module";

import { NoteComponent } from "./component/note/note.component";
import { NavComponent } from "./component/nav/nav.component";

import { NgxWigModule } from "ngx-wig";

@NgModule({
  declarations: [AppComponent, NavComponent, NoteComponent],
  imports: [SharedModule, NgxWigModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
