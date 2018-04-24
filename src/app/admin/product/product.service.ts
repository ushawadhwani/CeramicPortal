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
export class ProductService {

  constructor(private http: Http) { }

  private baseUrl = config.baseapiurl;
  getAllProduct() {
    return this.http.get(this.baseUrl + 'getAllProducts')
      .map((res: Response) => res.json())
      .do(res => console.log('getAllProducts: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSingleProduct(id) {
    return this.http.get(this.baseUrl + 'productDetail' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getSinglePotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParticularProduct(id) {
    return this.http.delete(this.baseUrl + 'removeProduct' + '/' + id)
      .map((res: Response) => res.json())
      //.do(res => console.log('getPotentialUser: ' + JSON.stringify(res)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  saveProduct(product): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (product.id === '0') {
      return this.createProduct(product, options);
    }
    return this.updateProduct(product, options);
  }

  private createProduct(product, options: RequestOptions): Observable<Response> {
    product.id = undefined;
    return this.http.post(this.baseUrl + 'addNewProduct', product, options)
      .map((res: Response) => res.json())
      .do(res => console.log('addNewProduct: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private updateProduct(product, options: RequestOptions): Observable<Response> {
    const url = `${this.baseUrl + 'updateProduct'}/${product.id}`;
    return this.http.patch(url, product, options)
      .map((res: Response) => res.json())
      .do(res => console.log('updateProduct: ' + JSON.stringify(res)))
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
