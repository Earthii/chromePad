import { Pipe, PipeTransform } from "@angular/core";
import { Note } from "../../models/Note";

@Pipe({
  name: "searchNote"
})
export class SearchNotePipe implements PipeTransform {
  transform(notes: Note[], query: string): Note[] {
    console.log(query);
    return notes;
  }
}
