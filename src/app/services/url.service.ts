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
    const url = this.getSessionsBaseUrl();
    return `${ url }/logged`;
  }

  public getSignUpUrl(): string {
    const url = this.getSessionsBaseUrl();
    return `${ url }/cadastro`;
  }
}
