import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import{ Cliente } from './cliente';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 private url = 'http://localhost:8080/clientes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

    showMessage(msg: string): void{
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top"
      })
    }

  //metodo que lê por id
  readById(id: string): Observable<Cliente> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Cliente>(url)
  }

  //metodo alterar
  update(clientes: Cliente): Observable<Cliente> {
    const url = `${this.url}/alterar/${clientes.id}`
    return this.http.put<Cliente>(url, clientes)
  }    

  /** GET clientes from the server */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched clientes')),
        catchError(this.handleError<Cliente[]>('getClientes', []))
      );
  }

  /** GET Cliente by id. Return `undefined` when id not found */
  getClienteNo404<Data>(id: number): Observable<Cliente> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Cliente[]>(url)
      .pipe(
        map(clientes => clientes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Cliente id=${id}`);
        }),
        catchError(this.handleError<Cliente>(`getCliente id=${id}`))
      );
  }

  /** GET Cliente by id. Will 404 if id not found */
  getCliente(id: number): Observable<Cliente> {
    const url = `${this.url}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => this.log(`fetched Cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  /* GET clientes whose name contains search term */
  searchclientes(term: string): Observable<Cliente[]> {
    if (!term.trim()) {
      // if not search term, return empty Cliente array.
      return of([]);
    }
    return this.http.get<Cliente[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found clientes matching "${term}"`) :
         this.log(`no clientes matching "${term}"`)),
      catchError(this.handleError<Cliente[]>('searchclientes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Cliente to the server */
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => this.log(`added Cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  /** DELETE: delete the Cliente from the server */
  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted cliente id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  /** PUT: update the Cliente on the server */
  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.url}/alterar/${cliente.id}`, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`updated Cliente id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
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
    this.messageService.add(`ClienteService: ${message}`);
  }


}
