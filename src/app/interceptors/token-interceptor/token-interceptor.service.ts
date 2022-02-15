import { Injectable } from '@angular/core';
import { switchMap, catchError, filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import SignInResponsePayload from 'src/app/models/sign-in-response.payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    public authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.indexOf('refresh') !== -1 || request.url.indexOf('login') !== -1) {
      return next.handle(request);
    }

    // Retrieve authentication token from local storage
    const jwtToken = this.authService.getJwtTokenFromLocalStorage();

    // Check if authentication token is invalid
    if (jwtToken) {
      return next
        .handle(this.addJwtTokenToHeader(request, jwtToken))
        .pipe(catchError(
          error => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
              return this.handleAuthErrors(request, next)
            } else {
              return throwError(error);
            }
          }
        ));
    }
    return next.handle(request);
  }

  private handleAuthErrors(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService
        .getRefreshToken()
        .pipe(switchMap(
          (refreshTokenResponse: SignInResponsePayload) => {
            this.isTokenRefreshing = false;
            this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);

            return next.handle(this.addJwtTokenToHeader(request, refreshTokenResponse.authenticationToken));
          }
        ));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addJwtTokenToHeader(request, this.authService.getJwtTokenFromLocalStorage))
        })
      );
    }
  }

  // Add jwt Token to header
  private addJwtTokenToHeader(request: HttpRequest<any>, jwtToken: any) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
  }

}
