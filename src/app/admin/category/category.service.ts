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

  constructor(private http: Http) { }

  private baseUrl = config.baseapiurl;
  getAllCategory() {
    return this.http.get(this.baseUrl + 'getCategory')
      .map((res: Response) => res.json())
      .do(res => console.log('getCategory: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSingleCategory(id) {
    return this.http.get(this.baseUrl + 'categoryDetail' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getSinglePotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParticularCategory(id) {
    return this.http.delete(this.baseUrl + 'removeCategory' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  saveCategory(category): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (category.id === '0') {
      return this.createCategory(category, options);
    }
    return this.updateCategory(category, options);
  }

  private createCategory(category, options: RequestOptions): Observable<Response> {
    category.id = undefined;
    return this.http.post(this.baseUrl + 'addNewCategory', category, options)
      .map((res: Response) => res.json())
      .do(res => console.log('createCategory: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private updateCategory(category, options: RequestOptions): Observable<Response> {
    const url = `${this.baseUrl + 'updateCategory'}/${category.id}`;
    return this.http.patch(url, category, options)
      .map((res: Response) => res.json())
      .do(res => console.log('updateCategory: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
