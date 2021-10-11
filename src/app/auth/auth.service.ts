import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "./user.model";

import { environment } from "src/environments/environment";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;
  private apiKey!: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){
    this.apiKey = environment.firebaseApiKey;
  }

  signUp(email: string, password: string): Observable<object>{
    return this._http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey,{
      "email": email,
      "password": password,
      "returnSecureToken": true
    }).pipe(
    tap(resData => {
      this.handelAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }),
    catchError(this.errorRespon))
  }

  login(email: string, password: string): Observable<object>{
    return this._http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apiKey, {
      "email": email,
      "password": password,
      "returnSecureToken": true
    }).pipe(
      tap(resData => {
        this.handelAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }),
      catchError(this.errorRespon));
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiratonDate: string
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return;
    }

    const loadedUser =  new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiratonDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpiratonDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
    this._router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private errorRespon(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error ocured';

    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }

    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email  exists is already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Wrong email.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Your account is disabled.';
        break;
    }

    return throwError(errorMessage);
  }

  private handelAuth(email: string, userId: string, token:string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}
