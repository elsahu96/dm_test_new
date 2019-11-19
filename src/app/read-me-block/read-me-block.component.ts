import { Component, OnInit, Output } from '@angular/core';
import WordCloud from '../../../node_modules/wordcloud/src/wordcloud2';
import { ReadmeBlockService } from '../readme-block.service';
import { EventEmitter } from 'events';
import { MatSliderChange } from '@angular/material';
@Component({
  selector: 'app-read-me-block',
  templateUrl: './read-me-block.component.html',
  styleUrls: ['./read-me-block.component.sass']
})
export class ReadMeBlockComponent implements OnInit {

  constructor(private readmeService: ReadmeBlockService) { }

  ngOnInit() {
  }

  onSliderChange(e) {
    this.readmeService.setFactor(e.value);
  }

}
