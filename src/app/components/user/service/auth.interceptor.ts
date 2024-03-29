import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.authService.getToken();
    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            console.log(req.headers);
            this.router.navigate(['/forbidden']);
          }
          return throwError("Coś poszło nie tak");
        }
      )
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
