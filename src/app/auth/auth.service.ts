import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  
  email: string;
  id:number;
  password:string;

}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/users',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.id
          );

          this.router.navigate(['/books']);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .get<AuthResponseData>(
        'http://localhost:3000/users?email='+email+'&password='+password)
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log("In login ", resData);
          this.handleAuthentication(
            resData[0].email,
            resData[0].id
          );
        })
      );
  }

  logout() {
      localStorage.removeItem('userData');
      this.user.next(null);
      this.router.navigate(['/books']);
     }

  private handleAuthentication(
    email: string,
    userId: number
   
  ) {
    const user = new User(email,userId);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
