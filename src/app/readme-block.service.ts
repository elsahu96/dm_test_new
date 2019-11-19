import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadmeBlockService {

  // content of readme
  searchResults: string;
  title_arr: string[];
  // ['title': 'content']
  title_content: any;
  // shortening factor
  shorten_factor: number;

  title_words = {};
  // trimmed content for each title['title': 'trimmed content']
  trimmed_content: any = {};

  constructor() {
  }

  setFactor(value: number) {
    const valuePercent = value / 100;
    for (const title in this.title_words) {
      const title_length = this.title_words[title].length
      // trim length
      const new_length = Math.round(title_length * valuePercent);
      const content = this.title_words[title];
      this.trimmed_content[title] = content.slice(0, new_length).join(' ');
    }
  }

  setTitleContent() {
    for (const title in this.title_content) {
      let all_words = []
      const content = this.title_content[title];
      const matchGroups = content.match(/```[a-z]*[\s\S]*?```/gm);
      let start = 0;
      if (matchGroups && matchGroups.length) {
        for (let group of matchGroups) {
          const words = content.substring(start, content.indexOf(group)).split(/[\s\n]+/);
          all_words = all_words.concat(words);
          all_words.push(group);
          start = content.indexOf(group) + group.length;
        }
      }
      all_words = all_words.concat(content.substring(start).split(/[\s\n]+/));
      this.title_words[title] = all_words;
    }
    this.setFactor(50);
  }

  resetAll() {
    this.title_arr = [];
    this.title_content = {};
  }

  processWords(text_content: string) {
    this.title_content = {};
    const code_regex = /```[a-z]*\n[\s\S]*?\n```/g;
    // replace code block as a space
    const str_without_code = text_content.replace(code_regex, '');
    const title_regex = /^#+.+/mg;
    // all the titles
    this.title_arr = str_without_code.match(title_regex);
    // extract content for each title
    for (let i = 0; i < this.title_arr.length - 1; i++) {
      const title = this.title_arr[i];
      this.title_content[title] = text_content.substring(
        text_content.indexOf(title) + title.length,
        text_content.indexOf(this.title_arr[i + 1])
      );
    }
    // content of the last title
    const last_title = this.title_arr[this.title_arr.length - 1];
    this.title_content[last_title] = text_content.substring(
      text_content.indexOf(last_title) + last_title.length);
    this.setTitleContent();
  }

}
