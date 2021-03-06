import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MadlibsService {
  submit$ = new Subject<any>();
  words: any;
  madlibReady = false;
  pronoun: any;

  private _API = 'http://localhost:8084/api/';

  constructor(private http: HttpClient) {}

  submit(eventObj) {
    this.submit$.next(eventObj);
    this.words = eventObj;
  }

  private _stringSuccessHandler(res: string): string {
    // Remove all double quotes from response
    // This is a product of receiving text response
    return res.replace(/"/g, '');
  }

  private _errorHandler(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }

  getNouns$() {
    const nounPerson$ = this.http
      .get(`${this._API}noun/person`, { responseType: 'text' })
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    const nounPlace$ = this.http
      .get(`${this._API}noun/place`, { responseType: 'text' })
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    const nounThing$ = this.http
      .get(`${this._API}noun/thing`, { responseType: 'text' })
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([
      nounPerson$,
      nounPlace$,
      nounPlace$,
      nounThing$,
      nounThing$
    ]);
  }

  getVerbs$() {
    const verbPresent$ = this.http
      .get(`${this._API}verb/present`, { responseType: 'text' })
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    const verbPast$ = this.http
      .get(`${this._API}verb/past`, { responseType: 'text' })
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([
      verbPresent$,
      verbPresent$,
      verbPast$,
      verbPast$,
      verbPast$
    ]);
  }

  getAdjs$() {
    const adj$ = this.http
      .get(`${this._API}adjective`, { responseType: 'text' })
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([adj$, adj$, adj$, adj$, adj$]);
  }

  getWords$() {
    return Observable.zip(
      this.getNouns$(),
      this.getVerbs$(),
      this.getAdjs$()
    ).map(res => {
      return {
        nouns: res[0],
        verbs: res[1],
        adjs: res[2]
      };
    });
  }

  setMadlibReady(val: boolean) {
    this.madlibReady = val;
  }

  setPronoun(obj) {
    this.pronoun = obj;
  }

  getPronoun$() {
    return this.http
      .get(`${this._API}pronoun/gendered`)
      .catch(this._errorHandler);
  }
}
