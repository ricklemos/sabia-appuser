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
import { InstructorDashModule } from './instructor-dash/instructor-dash.module';
import { HomeModule } from './home/home.module';
import { ChartsModule } from 'ng2-charts';


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
    HomeModule,
    InstructorDashModule,
    ChartsModule
  ],
  providers: [
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
