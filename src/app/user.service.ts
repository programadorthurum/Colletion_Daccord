import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import{ User } from './user';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/user';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

  /** GET user from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
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
  readById(id: string): Observable<User> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<User>(url)
  }

  //metodo alterar
  update(user: User): Observable<User> {
    const url = `${this.url}/alterar/${user.id}`
    return this.http.put<User>(url, user)
  }

  /** PUT: update the User on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.url}/alterar/${user.id}`, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated User id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }  

  /** GET User by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(user => user[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} User id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET user whose name contains search term */
  searchuser(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found user matching "${term}"`) :
         this.log(`no user matching "${term}"`)),
      catchError(this.handleError<User[]>('searchuser', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  /** DELETE: delete the User from the server */
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
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

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }


}

