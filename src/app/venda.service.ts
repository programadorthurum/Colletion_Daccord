import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Venda } from './venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private url = 'http://localhost:8080/venda';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

  /** GET venda from the server */
  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched venda')),
        catchError(this.handleError<Venda[]>('getVendas', []))
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
  readById(id: string): Observable<Venda> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Venda>(url)
  }

  //metodo alterar
  update(venda: Venda): Observable<Venda> {
    const url = `${this.url}/${venda.id}`
    return this.http.put<Venda>(url, Venda)
  }

    /** PUT: update the Venda on the server */
    updateVenda(venda: Venda): Observable<any> {
      return this.http.put(`${this.url}/alterar/${venda.id}`, Venda, this.httpOptions).pipe(
        tap(_ => this.log(`updated Venda id=${venda.id}`)),
        catchError(this.handleError<any>('updateVenda'))
      );
    }
  

  /** GET Venda by id. Return `undefined` when id not found */
  getFornecedorNo404<Data>(id: number): Observable<Venda> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Venda[]>(url)
      .pipe(
        map(venda => venda[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Venda id=${id}`);
        }),
        catchError(this.handleError<Venda>(`getVenda id=${id}`))
      );
  }

  /** GET Venda by id. Will 404 if id not found */
  getVenda(id: number): Observable<Venda> {
    const url = `${this.url}/${id}`;
    return this.http.get<Venda>(url).pipe(
      tap(_ => this.log(`fetched Venda id=${id}`)),
      catchError(this.handleError<Venda>(`getVenda id=${id}`))
    );
  }

  /* GET venda whose name contains search term */
  searchvenda(term: string): Observable<Venda[]> {
    if (!term.trim()) {
      // if not search term, return empty Venda array.
      return of([]);
    }
    return this.http.get<Venda[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found venda matching "${term}"`) :
         this.log(`no venda matching "${term}"`)),
      catchError(this.handleError<Venda[]>('searchvenda', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Venda to the server */
  addVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.url, venda, this.httpOptions).pipe(
      tap((newVenda: Venda) => this.log(`added Venda w/ id=${newVenda.id}`)),
      catchError(this.handleError<Venda>('addVenda'))
    );
  }

  /** DELETE: delete the Venda from the server */
  deleteVenda(venda: Venda | number): Observable<Venda> {
    const id = typeof venda === 'number' ? venda : venda.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Venda>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted venda id=${id}`)),
      catchError(this.handleError<Venda>('deleteVenda'))
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

  /** Log a ClienteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`VendaService: ${message}`);
  }


}
