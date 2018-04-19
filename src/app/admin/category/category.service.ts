import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { config } from 'app/config';

@Injectable()
export class CategoryService {
  
  constructor() { }
  private http: Http;
  private baseUrl = config.baseapiurl + 'category';
  getCategory() {
    return this.http.get(this.baseUrl + '/getCategory')
      .map(this.extractData)
      .do(data => console.log('getCategory: ' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  saveCategory(category): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (category.id === 0) {
      return this.createCategory(category, options);
    }
    return this.updateCategory(category, options);
  }

  private createCategory(category, options: RequestOptions): Observable<Response> {
    category.id = undefined;
    return this.http.post(this.baseUrl, category, options)
      .map(this.extractData)
      .do(data => console.log('createCategory: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateCategory(category, options: RequestOptions): Observable<Response> {
    const url = `${this.baseUrl}/${category.id}`;
    return this.http.put(url, category, options)
      .map(() => category)
      .do(data => console.log('updateCategory: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

}
