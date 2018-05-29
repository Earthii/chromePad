import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StripHtmlService {
  constructor() {}

  removeHtmlFromString(string: string): string {
    const removeHtmlRegex = /<[^>]*>?|&nbsp;/g;
    const contentFormatLists = string.replace(/<\/li>/g, " ");
    const contentStripedOfHtml = contentFormatLists.replace(
      removeHtmlRegex,
      ""
    );

    return contentStripedOfHtml;
  }
}
