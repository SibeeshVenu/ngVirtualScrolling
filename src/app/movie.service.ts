import { Injectable } from '@angular/core';
import { RequestMethod, RequestOptions, Request, Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: Http) {
   }

  get(url: string) {
    return this.request(url, RequestMethod.Get)
  }
  
  request(url: string, method: RequestMethod): any {
    const requestOptions = new RequestOptions({
      method: method,
      url: url
    });

    const request = new Request(requestOptions);
    return this.http.request(request);
  }
}
