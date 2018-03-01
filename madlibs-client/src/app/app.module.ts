import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpeechService } from './speech.service';
import { ListenComponent } from './listen/listen.component';
import { MadlibsService } from './madlibs.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ListenComponent],
  imports: [BrowserModule, FormsModule],
  providers: [SpeechService, MadlibsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
