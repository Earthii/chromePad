import { Pipe, PipeTransform } from "@angular/core";
import { Note } from "../../models/Note";

@Pipe({
  name: "sortNoteByDate"
})
export class SortNoteByDatePipe implements PipeTransform {
  transform(notes: Note[]): Note[] {
    const sortedItems = notes.sort(
      (a: Note, b: Note) => b.lastUpdated - a.lastUpdated
    );
    return sortedItems;
  }
}
