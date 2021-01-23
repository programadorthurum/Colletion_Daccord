import { Categoria } from './categoria';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
 private url = 'http://localhost:8080/categoria';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

  /** GET categoria from the server */
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched categoria')),
        catchError(this.handleError<Categoria[]>('getCategorias', []))
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
  readById(id: string): Observable<Categoria> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Categoria>(url)
  }

  //metodo alterar
  update(categoria: Categoria): Observable<Categoria> {
    const url = `${this.url}/alterar/${categoria.id}`
    return this.http.put<Categoria>(url, categoria)
  }

  /** PUT: update the Categoria on the server */
  updateCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(`${this.url}/alterar/${categoria.id}`, categoria, this.httpOptions).pipe(
      tap(_ => this.log(`updated Categoria id=${categoria.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
  }  

  /** GET Categoria by id. Return `undefined` when id not found */
  getCategoriaNo404<Data>(id: number): Observable<Categoria> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Categoria[]>(url)
      .pipe(
        map(categoria => categoria[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Categoria id=${id}`);
        }),
        catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
      );
  }

  /** GET Categoria by id. Will 404 if id not found */
  getCategoria(id: number): Observable<Categoria> {
    const url = `${this.url}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => this.log(`fetched Categoria id=${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    );
  }

  /* GET categoria whose name contains search term */
  searchcategoria(term: string): Observable<Categoria[]> {
    if (!term.trim()) {
      // if not search term, return empty Categoria array.
      return of([]);
    }
    return this.http.get<Categoria[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found categoria matching "${term}"`) :
         this.log(`no categoria matching "${term}"`)),
      catchError(this.handleError<Categoria[]>('searchcategoria', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Categoria to the server */
  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, categoria, this.httpOptions).pipe(
      tap((newCategoria: Categoria) => this.log(`added Categoria w/ id=${newCategoria.id}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }

  /** DELETE: delete the Categoria from the server */
  deleteCategoria(categoria: Categoria | number): Observable<Categoria> {
    const id = typeof categoria === 'number' ? categoria : categoria.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Categoria>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted categoria id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
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
