import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MadlibsService {
  submit$ = new Subject<any>();
  words: any;

  constructor() { }

  submit(eventObj) {
    this.submit$.next(eventObj);
    this.words = eventObj;
  }

}
