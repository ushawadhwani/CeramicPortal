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
export class ExhibitionService {

  constructor(private http: Http) { }

  private baseUrl = config.baseapiurl;
  getAllExhibition() {
    return this.http.get(this.baseUrl + 'getEvent')
      .map((res: Response) => res.json())
      .do(res => console.log('getEvent: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSingleExhibition(id) {
    return this.http.get(this.baseUrl + 'eventDetail' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getSinglePotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParticularExhibition(id) {
    return this.http.delete(this.baseUrl + 'removeEvent' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  saveExhibition(event): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (event.id === '0') {
      return this.createExhibition(event, options);
    }
    return this.updateExhibition(event, options);
  }

  private createExhibition(event, options: RequestOptions): Observable<Response> {
    event.id = undefined;
    return this.http.post(this.baseUrl + 'addNewEvent', event, options)
      .map((res: Response) => res.json())
      .do(res => console.log('addNewEvent: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private updateExhibition(event, options: RequestOptions): Observable<Response> {
    const url = `${this.baseUrl + 'updateEvent'}/${event.id}`;
    return this.http.patch(url, event, options)
      .map((res: Response) => res.json())
      .do(res => console.log('updateEvent: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
