import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "stripHtml"
})
export class StripHtmlPipe implements PipeTransform {
  transform(string: string): string {
    const removeHtmlRegex = /<[^>]*>?|&nbsp;/g;
    const contentFormatLists = string.replace(/<\/li>/g, " ");
    const contentStripedOfHtml = contentFormatLists.replace(
      removeHtmlRegex,
      ""
    );

    return contentStripedOfHtml;
  }
}
