import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MadlibsService } from '../madlibs.service';

@Component({
  selector: 'app-generate-words',
  templateUrl: './generate-words.component.pug',
  styleUrls: ['./generate-words.component.scss']
})
export class GenerateWordsComponent implements OnDestroy {
  @Output() fetchedWords = new EventEmitter(); // emit an event from this component to a parent
  wordsSub: Subscription;
  loading = false;
  generated = false;
  error = false;

  constructor(private ml: MadlibsService) {}

  fetchWords() {
    this.loading = true;
    this.generated = false;
    this.error = false;

    this.wordsSub = this.ml.getWords$().subscribe(
      res => {
        this.loading = false;
        this.generated = true;
        this.error = false;
        this.fetchedWords.emit(res);
      },
      err => {
        this.loading = false;
        this.generated = false;
        this.error = true;
        console.warn(err);
      }
    );
  }

  ngOnDestroy() {
    if (this.wordsSub) {
      this.wordsSub.unsubscribe();
    }
  }
}
