import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from './produto';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
 private url = 'http://localhost:8080/produto';  // URL to web api

 httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

 constructor(
   private http: HttpClient,
   private snackBar: MatSnackBar,
   private messageService: MessageService) { }

  //Apenas para teste
  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  //metodo que lê por id
  readById(id: string): Observable<Produto> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Produto>(url)
  }

  //metodo alterar
  update(produto: Produto): Observable<Produto> {
    const url = `${this.url}/alterar/${produto.id}`
    return this.http.put<Produto>(url, produto)
  }


 /** GET produtos from the server */
 getProdutos(): Observable<Produto[]> {
   return this.http.get<Produto[]>(this.url)
     .pipe(
       tap(_ => this.log('fetched produtos')),
       catchError(this.handleError<Produto[]>('getProdutos', []))
     );
 }

 /** GET Produto by id. Return `undefined` when id not found */
 getProdutoNo404<Data>(id: number): Observable<Produto> {
   const url = `${this.url}/?id=${id}`;
   return this.http.get<Produto[]>(url)
     .pipe(
       map(produtos => produtos[0]), // returns a {0|1} element array
       tap(h => {
         const outcome = h ? `fetched` : `did not find`;
         this.log(`${outcome} Produto id=${id}`);
       }),
       catchError(this.handleError<Produto>(`getProduto id=${id}`))
     );
 }

 /** GET Produto by id. Will 404 if id not found */
 getProduto(id: number): Observable<Produto> {
   const url = `${this.url}/${id}`;
   return this.http.get<Produto>(url).pipe(
     tap(_ => this.log(`fetched Produto id=${id}`)),
     catchError(this.handleError<Produto>(`getProduto id=${id}`))
   );
 }

 /* GET produtos whose name contains search term */
 searchprodutos(term: string): Observable<Produto[]> {
   if (!term.trim()) {
     // if not search term, return empty Produto array.
     return of([]);
   }
   return this.http.get<Produto[]>(`${this.url}/?name=${term}`).pipe(
     tap(x => x.length ?
        this.log(`found produtos matching "${term}"`) :
        this.log(`no produtos matching "${term}"`)),
     catchError(this.handleError<Produto[]>('searchprodutos', []))
   );
 }

 //////// Save methods //////////

 /** POST: add a new Produto to the server */
 addProduto(produto: Produto): Observable<Produto> {
   return this.http.post<Produto>(this.url, produto, this.httpOptions).pipe(
     tap((newProduto: Produto) => this.log(`added Produto w/ id=${newProduto.id}`)),
     catchError(this.handleError<Produto>('addProduto'))
   );
 }

 /** DELETE: delete the Produto from the server */
 deleteProduto(produto: Produto | number): Observable<Produto> {
   const id = typeof produto === 'number' ? produto : produto.id;
   const url = `${this.url}/${id}`;

   return this.http.delete<Produto>(url, this.httpOptions).pipe(
     tap(_ => this.log(`deleted produto id=${id}`)),
     catchError(this.handleError<Produto>('deleteProduto'))
   );
 }

 /** PUT: update the Produto on the server */
 updateProduto(produto: Produto): Observable<any> {
   return this.http.put(`${this.url}/alterar/${produto.id}`, produto, this.httpOptions).pipe(
     tap(_ => this.log(`updated Produto id=${produto.id}`)),
     catchError(this.handleError<any>('updateProduto'))
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

 /** Log a ProdutoService message with the MessageService */
 private log(message: string) {
   this.messageService.add(`ProdutoService: ${message}`);
 }


}
