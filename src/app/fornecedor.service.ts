import { Fornecedor} from './fornecedor';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private url = 'http://localhost:8080/fornecedor';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

  /** GET fornecedor from the server */
  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched fornecedor')),
        catchError(this.handleError<Fornecedor[]>('getFornecedores', []))
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
  readById(id: string): Observable<Fornecedor> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Fornecedor>(url)
  }

  //metodo alterar
  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.url}/${fornecedor.id}`
    return this.http.put<Fornecedor>(url, fornecedor)
  }

    /** PUT: update the Fornecedor on the server */
    updateFornecedor(Fornecedor: Fornecedor): Observable<any> {
      return this.http.put(`${this.url}/alterar/${Fornecedor.id}`, Fornecedor, this.httpOptions).pipe(
        tap(_ => this.log(`updated Fornecedor id=${Fornecedor.id}`)),
        catchError(this.handleError<any>('updateFornecedor'))
      );
    }
  

  /** GET Fornecedor by id. Return `undefined` when id not found */
  getFornecedorNo404<Data>(id: number): Observable<Fornecedor> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Fornecedor[]>(url)
      .pipe(
        map(fornecedor => fornecedor[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Fornecedor id=${id}`);
        }),
        catchError(this.handleError<Fornecedor>(`getFornecedor id=${id}`))
      );
  }

  /** GET Fornecedor by id. Will 404 if id not found */
  getFornecedor(id: number): Observable<Fornecedor> {
    const url = `${this.url}/${id}`;
    return this.http.get<Fornecedor>(url).pipe(
      tap(_ => this.log(`fetched Fornecedor id=${id}`)),
      catchError(this.handleError<Fornecedor>(`getFornecedor id=${id}`))
    );
  }

  /* GET fornecedor whose name contains search term */
  searchfornecedor(term: string): Observable<Fornecedor[]> {
    if (!term.trim()) {
      // if not search term, return empty Fornecedor array.
      return of([]);
    }
    return this.http.get<Fornecedor[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found fornecedor matching "${term}"`) :
         this.log(`no fornecedor matching "${term}"`)),
      catchError(this.handleError<Fornecedor[]>('searchfornecedor', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Fornecedor to the server */
  addFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.url, fornecedor, this.httpOptions).pipe(
      tap((newFornecedor: Fornecedor) => this.log(`added Fornecedor w/ id=${newFornecedor.id}`)),
      catchError(this.handleError<Fornecedor>('addCategoria'))
    );
  }

  /** DELETE: delete the Fornecedor from the server */
  deleteFornecedor(fornecedor: Fornecedor | number): Observable<Fornecedor> {
    const id = typeof fornecedor === 'number' ? fornecedor : fornecedor.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Fornecedor>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted fornecedor id=${id}`)),
      catchError(this.handleError<Fornecedor>('deleteCategoria'))
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
    this.messageService.add(`CategoriaService: ${message}`);
  }


}
