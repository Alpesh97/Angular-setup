import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CoreHelperService } from '../core-helper/core-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CoreHttpService {

  constructor(private http: HttpClient, private coreHelperService: CoreHelperService) { }

  postRequest<TRequest, TResponse>(apiUrl: string, data: TRequest, showSpinner: boolean = true) {
    if (showSpinner) {
      this.coreHelperService.showSpinner(showSpinner);
    }
    return this.http.post<TResponse>(apiUrl, data).pipe(
      tap((response) => {
        response;
        if (showSpinner) {
          this.coreHelperService.hideSpinner();
        }
      }),
      catchError(this.handleError<TResponse[]>(apiUrl, []))
    );
  }

  getRequest<TResponse>(apiUrl: string, showSpinner: boolean = true) {
    if (showSpinner) {
      this.coreHelperService.showSpinner(showSpinner);
    }
    return this.http.get<TResponse>(apiUrl).pipe(
      tap((response) => {
        response;
        if (showSpinner) {
          this.coreHelperService.hideSpinner();
        }
      }),
      catchError(this.handleError<TResponse[]>(apiUrl, []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.coreHelperService.hideSpinner();
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.coreHelperService.openErrorToaster(error["message"]);
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
