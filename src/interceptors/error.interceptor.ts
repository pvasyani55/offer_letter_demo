import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        message = error.error.message;
      } else {
        switch (error.status) {
          case 400:
            message = error.error?.message || 'Bad request';
            break;
          case 401:
            message = 'Unauthorized. Please login again.';
            break;
          case 403:
            message = 'Access denied';
            break;
          case 404:
            message = 'Resource not found';
            break;
          case 422:
            message = error.error?.message || 'Validation failed';
            break;
          case 500:
            message = 'Server error. Please try again later.';
            break;
          default:
            message = `Error ${error.status}: ${error.statusText}`;
        }
      }

      console.error('HTTP Error:', error);
      alert(message);
      return throwError(() => new Error(message));
    })
  );
};
