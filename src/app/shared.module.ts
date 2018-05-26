import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  exports: [BrowserModule, CommonModule, FormsModule]
})
export class SharedModule {}
