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

export class LoginService {

  constructor(
    private http: Http
  ) { }
  private baseUrl = config.baseapiurl;

  login(email, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let login = {
      email: email,
      password: password
    }
    return this.http.post(this.baseUrl + 'login', login, options)
      .map(res => res.json())
      .do(res => console.log('return data from login service ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
