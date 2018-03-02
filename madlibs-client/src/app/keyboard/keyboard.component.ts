import { Component } from '@angular/core';
import { Words } from '../word';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.pug',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  nouns: string[] = new Words().array;
  verbs: string[] = new Words().array;
  adjs: string[] = new Words().array;
  constructor() {}
}
