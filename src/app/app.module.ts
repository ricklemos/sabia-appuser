import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SessionsModule } from './sessions/sessions.module';
import { UrlService } from './services/url.service';
import { TextMaskModule } from 'angular2-text-mask';
import { CollactDesignSystemModule } from 'collact-design-system';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SessionsModule,
    CollactDesignSystemModule,
    TextMaskModule,
  ],
  providers: [
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
