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
export class SizeService {

  constructor(private http: Http) { }

  private baseUrl = config.baseapiurl;
  getAllSize() {
    return this.http.get(this.baseUrl + 'getSize')
      .map((res: Response) => res.json())
      .do(res => console.log('getSize: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSingleSize(id) {
    return this.http.get(this.baseUrl + 'sizeDetail' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getSinglePotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParticularSize(id) {
    return this.http.delete(this.baseUrl + 'removeSize' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  saveSize(size): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (size.id === '0') {
      return this.createSize(size, options);
    }
    return this.updateSize(size, options);
  }

  private createSize(size, options: RequestOptions): Observable<Response> {
    size.id = undefined;
    return this.http.post(this.baseUrl + 'addNewSize', size, options)
      .map((res: Response) => res.json())
      .do(res => console.log('createSize: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private updateSize(size, options: RequestOptions): Observable<Response> {
    const url = `${this.baseUrl + 'updateSize'}/${size.id}`;
    return this.http.patch(url, size, options)
      .map((res: Response) => res.json())
      .do(res => console.log('updateSize: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
