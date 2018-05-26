import { NoteComponent } from "./component/note/note.component";
import { NavComponent } from "./component/nav/nav.component";
import { SharedModule } from "./shared.module";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, NavComponent, NoteComponent],
  imports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
