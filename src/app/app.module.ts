import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ProfileModule } from './profile/profile.module';
import { SessionsModule } from './sessions/sessions.module';
import { UrlService } from './services/url.service';
import { CoursesModule } from './courses/courses.module';
import { TextMaskModule } from 'angular2-text-mask';
import { CollactDesignSystemModule } from 'collact-design-system';
import { QuestionaryModule } from './questionary/questionary.module';
import { ModuleModule } from './module/module.module';
import { RankingsModule } from './rankings/rankings.module';
import { HomeModule } from './home/home.module';
import { ClassroomsDashModule } from './classrooms-dash/classrooms-dash.module';
import { StorageService } from './services/storage.service';
import { WelcomeModule } from './welcome/welcome.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ProfileModule,
    SessionsModule,
    CollactDesignSystemModule,
    TextMaskModule,
    QuestionaryModule,
    ModuleModule,
    RankingsModule,
    CoursesModule,
    ClassroomsDashModule,
    HomeModule,
    WelcomeModule
  ],
  providers: [
    UrlService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
