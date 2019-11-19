import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.github.VERSION.html'
    })
  };
  public searchResults: any;

  constructor(private httpClient: HttpClient) { }

  getReadMe(repoName: string) {
    return this.httpClient.get(`https://api.github.com/repos/${repoName}/readme`, this.httpOptions);
  }

  //makes the HTTP request to get the resources and returns the response as observable;  
  public searchEntries(term): Observable<any> {
    if (term === "") {
      console.log("Not defined");
      return of(null);
    } else {
      let params = { q: term }
      return this.httpClient.get(`https://api.github.com/repos/${term}/readme`).pipe(
        map(response => {
          console.log(response)
          return this.searchResults = response["items"];
        })
      );
    }
  }

  //returns the response for the first method
  public _searchEntries(term) {
    return this.searchEntries(term);
  }

}
