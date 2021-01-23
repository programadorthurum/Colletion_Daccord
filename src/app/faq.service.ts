import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Faq } from './faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private url = 'http://localhost:8080/faq';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

  /** GET faq from the server */
  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched faqs')),
        catchError(this.handleError<Faq[]>('getFaqs', []))
      );
  }
  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  //metodo que lê por id
  readById(id: string): Observable<Faq> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Faq>(url)
  }

  //metodo alterar
  update(faq: Faq): Observable<Faq> {
    const url = `${this.url}/alterar/${faq.id}`
    return this.http.put<Faq>(url, faq)
  }

  /** PUT: update the Faq on the server */
  updateCategoria(faq: Faq): Observable<any> {
    return this.http.put(`${this.url}/alterar/${faq.id}`, faq, this.httpOptions).pipe(
      tap(_ => this.log(`updated Faq id=${faq.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
  }  

  /** GET Faq by id. Return `undefined` when id not found */
  getCategoriaNo404<Data>(id: number): Observable<Faq> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Faq[]>(url)
      .pipe(
        map(faq => faq[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Faq id=${id}`);
        }),
        catchError(this.handleError<Faq>(`getFaq id=${id}`))
      );
  }

  /** GET Faq by id. Will 404 if id not found */
  getFaq(id: number): Observable<Faq> {
    const url = `${this.url}/${id}`;
    return this.http.get<Faq>(url).pipe(
      tap(_ => this.log(`fetched Faq id=${id}`)),
      catchError(this.handleError<Faq>(`getFaq id=${id}`))
    );
  }

  /* GET faq whose name contains search term */
  searchfaq(term: string): Observable<Faq[]> {
    if (!term.trim()) {
      // if not search term, return empty Faq array.
      return of([]);
    }
    return this.http.get<Faq[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found faq matching "${term}"`) :
         this.log(`no faq matching "${term}"`)),
      catchError(this.handleError<Faq[]>('searchfaq', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Faq to the server */
  addFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.url, faq, this.httpOptions).pipe(
      tap((newFaq: Faq) => this.log(`added Faq w/ id=${newFaq.id}`)),
      catchError(this.handleError<Faq>('addFaq'))
    );
  }
  /** DELETE: delete the Faq from the server */
  deleteFaq(faq: Faq | number): Observable<Faq> {
    const id = typeof faq === 'number' ? faq : faq.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Faq>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted faq id=${id}`)),
      catchError(this.handleError<Faq>('deleteFaq'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a FaqService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FaqService: ${message}`);
  }


}
