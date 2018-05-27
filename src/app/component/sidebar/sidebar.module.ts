import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";

import { SidebarComponent } from "./sidebar.component";
import { NavComponent } from "./nav/nav.component";
import { ControlsComponent } from "./controls/controls.component";

@NgModule({
  imports: [SharedModule],
  declarations: [SidebarComponent, NavComponent, ControlsComponent],
  exports: [SidebarComponent, NavComponent]
})
export class SidebarModule {}
