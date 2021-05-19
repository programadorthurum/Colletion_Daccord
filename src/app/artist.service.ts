import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artist } from './artist';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private url = 'http://localhost:8080/artists';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private messageService: MessageService) { }

  /** GET artist from the server */
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched artists')),
        catchError(this.handleError<Artist[]>('getArtists', []))
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
  readById(id: string): Observable<Artist> {
    const url = `${this.url}/consultar/${id}`
    return this.http.get<Artist>(url)
  }

  //metodo alterar
  update(artist: Artist): Observable<Artist> {
    const url = `${this.url}/alterar/${artist.id}`
    return this.http.put<Artist>(url, artist)
  }

  /** PUT: update the Artist on the server */
  updateArtist(artist: Artist): Observable<any> {
    return this.http.put(`${this.url}/alterar/${artist.id}`, artist, this.httpOptions).pipe(
      tap(_ => this.log(`updated Artist id=${artist.id}`)),
      catchError(this.handleError<any>('updateArtist'))
    );
  }  

  /** GET Artist by id. Return `undefined` when id not found */
  getArtistNo404<Data>(id: number): Observable<Artist> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Artist[]>(url)
      .pipe(
        map(artist => artist[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Artist id=${id}`);
        }),
        catchError(this.handleError<Artist>(`getArtist id=${id}`))
      );
  }

  /** GET Artist by id. Will 404 if id not found */
  getArtist(id: number): Observable<Artist> {
    const url = `${this.url}/${id}`;
    return this.http.get<Artist>(url).pipe(
      tap(_ => this.log(`fetched Artist id=${id}`)),
      catchError(this.handleError<Artist>(`getArtist id=${id}`))
    );
  }

  /* GET artist whose name contains search term */
  searchartist(term: string): Observable<Artist[]> {
    if (!term.trim()) {
      // if not search term, return empty Artist array.
      return of([]);
    }
    return this.http.get<Artist[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found artist matching "${term}"`) :
         this.log(`no artist matching "${term}"`)),
      catchError(this.handleError<Artist[]>('searchartist', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Artist to the server */
  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.url, artist, this.httpOptions).pipe(
      tap((newArtist: Artist) => this.log(`added Artist w/ id=${newArtist.id}`)),
      catchError(this.handleError<Artist>('addArtist'))
    );
  }
  /** DELETE: delete the Artist from the server */
  deleteArtist(artist: Artist | number): Observable<Artist> {
    const id = typeof artist === 'number' ? artist : artist.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Artist>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted artist id=${id}`)),
      catchError(this.handleError<Artist>('deleteArtist'))
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

      // TODO: better job of transforming error for artist consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ArtistService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ArtistService: ${message}`);
  }


}

