import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { WelcomeRoutes } from './welcome-routing.module';
import { LayoutWelcomeComponent } from './layout/layout-welcome/layout-welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WelcomeService } from './services/welcome.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { USE_EMULATOR } from '@angular/fire/functions';
import { CollactDesignSystemModule } from 'collact-design-system';
import { WelcomeCoursesPageComponent } from './containers/welcome-courses-page/welcome-courses-page.component';
import { WelcomeCourseBoxComponent } from './components/welcome-course-box/welcome-course-box.component';



@NgModule({
  declarations: [
    LayoutWelcomeComponent,
    WelcomePageComponent,
    WelcomeCoursesPageComponent,
    WelcomeCourseBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(WelcomeRoutes),
    FlexLayoutModule,
    MatProgressBarModule,
    CollactDesignSystemModule,
  ],
  providers: [
    WelcomeService,
    // Caso teste funções HTTP do cloud functions localmente, usar provider USE_EMULATOR e ajustar porta
    { provide: USE_EMULATOR, useValue: ['localhost', 5001] }
    // { provide: REGION, useValue: 'us-central1' }
  ]
})
export class WelcomeModule { }
