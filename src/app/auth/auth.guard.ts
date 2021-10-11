import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
    ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
      return this._authService.user.pipe(
        take(1),
        map(user => {
          const isAuth =  !!user;
          if(isAuth){
            return true;
          }

          return this._router.createUrlTree(['/auth']);
        })
      );

  }
}
