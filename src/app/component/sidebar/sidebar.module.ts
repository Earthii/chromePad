import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";

import { SidebarComponent } from "./sidebar.component";
import { ControlsComponent } from "./controls/controls.component";
import { NavComponent } from "./nav/nav.component";
import { PreviewNoteComponent } from "./nav/preview-note/preview-note.component";

@NgModule({
  imports: [SharedModule],
  declarations: [
    SidebarComponent,
    ControlsComponent,
    NavComponent,
    PreviewNoteComponent
  ],
  exports: [SidebarComponent, NavComponent]
})
export class SidebarModule {}
