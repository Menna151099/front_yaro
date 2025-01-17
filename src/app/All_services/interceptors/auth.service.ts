// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../auth.service';
// import { inject } from '@angular/core';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private authService = inject(AuthService);

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();

//     if (token) {
//       const cloned = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return next.handle(cloned);
//     }

//     return next.handle(req);
//   }
// }
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          throw error;
        })
      );
    }

    return next.handle(req);
  }
}
