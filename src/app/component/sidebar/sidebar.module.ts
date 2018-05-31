import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";

import { SidebarComponent } from "./sidebar.component";
import { ControlsComponent } from "./controls/controls.component";
import { NavComponent } from "./nav/nav.component";
import { PreviewNoteComponent } from "./nav/preview-note/preview-note.component";

import { StripHtmlPipe } from "./../../pipes/strip-html/strip-html.pipe";
import { SearchNotePipe } from "./../../pipes/search-note/search-note.pipe";

@NgModule({
  imports: [SharedModule],
  declarations: [
    SidebarComponent,
    ControlsComponent,
    NavComponent,
    PreviewNoteComponent,
    // Pipes
    StripHtmlPipe,
    SearchNotePipe
  ],
  exports: [SidebarComponent, NavComponent]
})
export class SidebarModule {}
