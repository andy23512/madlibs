import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpeechService } from './speech.service';
import { ListenComponent } from './listen/listen.component';
import { MadlibsService } from './madlibs.service';

@NgModule({
  declarations: [AppComponent, ListenComponent],
  imports: [BrowserModule],
  providers: [SpeechService, MadlibsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
