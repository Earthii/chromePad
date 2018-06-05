import { Pipe, PipeTransform } from "@angular/core";
import { Note } from "../../models/Note";

@Pipe({
  name: "searchNote"
})
export class SearchNotePipe implements PipeTransform {
  transform(notes: Note[], query: string): Note[] {
    return notes.filter(item => {
      const inName = item.name.toLowerCase().includes(query);
      const inContent = item.content.toLowerCase().includes(query);
      return inName || inContent;
    });
  }
}
