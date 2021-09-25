import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UrlService } from '../services/url.service';
import { SessionsLoginService } from '../sessions/services/sessions-login.service';
import { SessionsRolesService } from '../sessions/services/sessions-roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private urlService: UrlService,
    private sessionsLoginService: SessionsLoginService,
    private sessionsRolesService: SessionsRolesService,
    private matSnackBar: MatSnackBar
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.angularFireAuth.currentUser;
    // const user = await this.angularFireAuth.authState.toPromise();
    console.log('authGuardUser', user);
    const isAuthenticated = !!user;
    if (!isAuthenticated) {
      await this.router.navigate([this.urlService.getLoginUrl()]);
      return false;
    }
    if (route.data.roles) {
      const userRole = this.sessionsRolesService.getRole();
      if (userRole === 'MASTER') {
        return true;
      } else {
        const isAllowed = route.data.roles.includes(userRole);
        this.matSnackBar.open('Você não tem permissão de acesso a essa página', 'OK', { duration: 4000 });
        this.router.navigate([this.urlService.getSessionsLogged()]);
        return isAllowed;
      }
    } else {
      return true;
    }
  }
}
