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
export class PotentialusersService {
  constructor(
    private http: Http
  ) { }
  private baseUrl = config.baseapiurl;
  getPotentialUsers() {
    return this.http.get(this.baseUrl + 'getPotentialUsers')
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getExhibitorUsers() {
    return this.http.get(this.baseUrl + 'getAllExhibitor')
      .map((res: Response) => res.json())
      .do(res => console.log('getAllExhibitor: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSinglePotentialUsers(id) {
    return this.http.get(this.baseUrl + 'potentialUserDetail' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getSinglePotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParticularPotentialUser(id) {
    return this.http.delete(this.baseUrl + 'removePotentialUsers' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  savePotentialUser(potentialuser): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if (potentialuser.id === '0') {
      return this.createPotentialUser(potentialuser, options);
    }
    return this.updatePotentialUser(potentialuser, options);
  }

  private createPotentialUser(potentialuser, options: RequestOptions): Observable<Response> {
    potentialuser.id = undefined;
    return this.http.post(this.baseUrl + 'addNewPotentialUsers', potentialuser, options)
      .map(this.extractData)
      .do(data => console.log('createPotentialUser: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updatePotentialUser(potentialuser, options: RequestOptions): Observable<Response> {
    const url = `${this.baseUrl + 'updatePotentialUsers'}/${potentialuser.id}`;
    return this.http.patch(url, potentialuser, options)
      .map(() => potentialuser)
      .do(data => console.log('updatePotentialUser: ' + JSON.stringify(data)))
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
