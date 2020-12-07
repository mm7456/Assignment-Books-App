import { Book } from '../books/book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BooksActions from '../books/store/book.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  public bookId:number;

  constructor(
    private http: HttpClient,

   private store : Store<fromApp.AppState>
  ) {}

  storeBooks(book) {
    return this.http
      .post(
        'http://localhost:3000/books',
        book
      )
      .pipe(catchError(this.erroHandler)
      );
  }

updateBook(id, book){
  return this.http.put('http://localhost:3000/books/' + id , book)
  .pipe(catchError(this.erroHandler));
}

erroHandler(error: HttpErrorResponse) {
  console.log(error);
  return throwError(error.message || 'server Error');
}

  fetchBooks() {
    return this.http
      .get<Book[]>(
        'http://localhost:3000/books'
      )
      .pipe(
        map(books => {
          return books.map(book => {
            return {
              ...book,
            };
          });
        }),
        tap(books => {
          console.log("In fetchBooks ",books);
          if(books.length == 0){
            this.bookId=0;
          }
          else
          {
            this.bookId=books[books.length-1].uid;

          }
          this.store.dispatch(new BooksActions.SetBooks(books));
        })
      );
  }

  deleteBook(id:number){
    return this.http.delete('http://localhost:3000/books/' + id)
    .pipe(catchError(this.erroHandler)
      );

  }
  addBook(book){
    return this.http
      .post(
        'http://localhost:3000/books',
        book
      )
      .pipe(catchError(this.erroHandler)
      );
  }

  fetchBookByUID(uid){
    return this.http.get('http://localhost:3000/books?uid='+uid).pipe(catchError(this.erroHandler));
  }
  
}
