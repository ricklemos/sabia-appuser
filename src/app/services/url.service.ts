import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() {
  }

  public getBaseUrl(): string {
    return environment.baseUrl;
  }

  public getSessionsBaseUrl(): string {
    return `/sessions`;
  }

  public getLoginUrl(): string {
    const url = this.getSessionsBaseUrl();
    return `${ url }/login`;
  }

  public getSessionsLogged(): string {
    return `sessions`;
  }

  public getSignUpUrl(): string {
    const url = this.getSessionsBaseUrl();
    return `${ url }/cadastro`;
  }

  public getProfileEditUrl(): string {
    return '/profile/edit';
  }

  public getProfileUrl(): string {
    return '/profile';
  }

  public getChangePasswordUrl(): string {
    return '/profile/change-password';
  }

  public getLesson(moduleId, lessonId): string {
    return `module/${ moduleId }/lesson/${ lessonId }`;
  }

  public getQuestionnaire(questionnaireId): string {
    return `/questionario/${ questionnaireId }`;
  }

  public getQuestionnaireReview(questionnaireId): string {
    return `/questionario/${ questionnaireId }/revisar`;
  }

  public getModule(moduleId): string {
    return `/module/${ moduleId }`;
  }


  public getRankings(): string {
    return `/ranking`;
  }

  public getClassroomRanking(classroomId): string {
    return `/ranking/${ classroomId }`;
  }


  public getCourses(): string {
    return '/courses';
  }

  public getCoursesDetails(courseId): string {
    return `/courses/${ courseId }`;

  }

  public getHome(): string {
    return `/home`;
  }

  public getClassroomsDashPage(): string {
    return `/painel-classes/classes`;
  }

  public getClassroomsDashClassroomPage(classroomId): string {
    return `/painel-classes/${ classroomId }`;
  }

  public getClassroomsDashCreateClassroomPage(): string {
    return `/painel-classes/criar`;
  }

  public getEditRolePage(): string {
    return `/sessions/edit-role`;
  }

  public getWelcomePage(): string {
    return `boas-vindas/1`;
  }
}
