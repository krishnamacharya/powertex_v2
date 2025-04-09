
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Router } from "@angular/router";
import { catchError } from "rxjs";
// import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from './toastr-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router,private spinner: NgxSpinnerService,private toasterService: ToasterService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   
    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Web': 'P0W3RTEX@123#'
        }

      });
    }
    // "Bearer mzTM4TyMiOLOEXzOEaTNugStd5JJ40"
    return next.handle(request).pipe(catchError((error, caught) => {
      //intercept the respons error and displace it to the console
      console.log(error, "error");
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      // this.spinner.hide()
      console.log('handled error ' + err.status);
      console.log('Authentication token has expired')
      localStorage.clear()
      this.toasterService.error("Authentication token has expired. Please login again to continue")
      // this.ngxSmartService.getModal('loginModal').open();
      // // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
   
    throw err;
  }
}