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
export class UserService {

  constructor(private http: Http) { }

  private baseUrl = config.baseapiurl;
  getAllUser() {
    return this.http.get(this.baseUrl + 'getUserList')
      .map((res: Response) => res.json())
      .do(res => console.log('getUserList: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getAllUserByRole(role) {
    return this.http.get(this.baseUrl + 'getUserListByRole/' + role)
      .map((res: Response) => res.json())
      .do(res => console.log('getUserListByRole: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // getSingleUser(id) {
  //   return this.http.get(this.baseUrl + 'userDetail' + '/' + id)
  //     .map((res: Response) => res.json())
  //     //.do(res => console.log('getSingleUser: ' + JSON.stringify(res)))
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  deleteParticularUser(id) {
    return this.http.delete(this.baseUrl + 'deleteUser' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  changeStatusParticularUser(id,flag) {
    return this.http.patch(this.baseUrl + 'changeUserStatus' + '/' + id,flag)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  // saveUser(user): Observable<Response> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   // if (user.id === '0') {
  //   //   return this.createUser(user, options);
  //   // }
  //   return this.updateUser(user, options);
  // }

  // private updateUser(user, options: RequestOptions): Observable<Response> {
  //   const url = `${this.baseUrl + 'updateCategory'}/${user.id}`;
  //   return this.http.patch(url, user, options)
  //     .map((res: Response) => res.json())
  //     .do(res => console.log('updateCategory: ' + JSON.stringify(res)))
  //     .catch(this.handleError);
  // }

  // private handleError(error: Response): Observable<any> {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }
}
