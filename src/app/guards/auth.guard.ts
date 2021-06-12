import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UrlService } from '../services/url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private urlService: UrlService
  ) {
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.angularFireAuth.currentUser;
    const isAuthenticated = user ? true : false;
    if (!isAuthenticated) {
      await this.router.navigate([this.urlService.getLoginUrl()], { queryParams: { returnUrl: state.url }});
    }
    return isAuthenticated;
  }

}
