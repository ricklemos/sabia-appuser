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

  public getHomeUrl(): string {
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
  // TODO: Lesson Module (Task da Pri)
  public getLesson(lessonId): string {
    return `/lesson/${ lessonId }`;
  }

  public getQuestionary(questionaryId): string {
    return `/questionary/${ questionaryId }`;
  }

  public getQuestionaryReview(questionaryId): string {
    return `/questionary/${ questionaryId }/review`;
  }

  public getModule(moduleId): string {
    return `/module/${ moduleId }`;
  }

  public getQuestionaryReview(questionaryId): string {
    return `/questionary/${ questionaryId }/review`;
  }

}
