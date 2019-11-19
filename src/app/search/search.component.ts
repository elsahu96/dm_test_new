import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ReadmeBlockService } from '../readme-block.service';
import { Subject, throwError, Subscription, of, empty } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  // if show the loading spinner
  loading: boolean;
  // if show the error msg
  error: boolean;

  searchTerm = new Subject<string>();
  searchForm: FormGroup;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.github.VERSION.raw',
      'Authorization': 'elsahu96:token OAUTH-TOKEN'
    })
  };

  constructor(private searchService: SearchService, private httpClient: HttpClient,
    private spinner: NgxSpinnerService, private readmeService: ReadmeBlockService) {
    this.searchForm = new FormGroup({
      search: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.readmeService.searchResults = "";
    this.search();
  }

  private search() {
    this.searchTerm.pipe(map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term === "") {
          this.readmeService.searchResults = "";
        }
        // display the loading spinner
        this.loading = true;
        this.spinner.show();
        console.log(term);
        return this.httpClient.get(`https://api.github.com/repos/${term}/readme`, this.httpOptions)
          .pipe(catchError((error) => {
            this.readmeService.resetAll();
            return this.handleError(error);
          }));
      })).subscribe(data => {
        this.loading = false;
        this.error = false;
        this.readmeService.processWords(atob(data['content']));
      }, error => {
        console.log(error);

      });
  }
  handleError(error: any): import("rxjs").ObservableInput <any> {
    this.error = true;
    // this.readmeService.searchResults = "Ooops, this repo doesn't exist";
    this.loading = false;
    return empty();
  }

}
