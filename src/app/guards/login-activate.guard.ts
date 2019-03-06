// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../commons/services/auth.service';
@Injectable()
export class LoginActiveGuard implements CanActivate {

  constructor(private auth: AuthService, private enroute: Router) {}

  canActivate(): Observable<boolean> {

    return this.auth.isLogged()
    .catch(
      (error: string) =>  { console.log('GUARD LOGIN CATCH!!: ' + error); return Observable.of(false); })
    .map((logged: boolean) => {
      console.log('GUARD LOGIN: ' + logged);

      if (logged) {
         return logged;
      } else if (!logged) {
        this.enroute.navigate(['/login']);
        return !logged;
      }
    });
  }
}
