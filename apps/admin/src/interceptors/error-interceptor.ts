import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Error } from '../services/error';
import { FlexiToastService } from 'flexi-toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  // readonly #toast = inject(FlexiToastService)

  return next(req).pipe(
    catchError((err:HttpErrorResponse) => {

      const error = inject(Error)
      error.handle(err)
      return of()

    })
  )
  // appconfig'e ekle
};
