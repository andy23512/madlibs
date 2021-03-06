import { Component } from '@angular/core';
import { SpeechService } from './speech.service';
import { MadlibsService } from './madlibs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(public speech: SpeechService, public ml: MadlibsService) {}
}
