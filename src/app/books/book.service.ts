import { DataStorageService } from '../shared/data-storage.service';
import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BookService {
  booksChanged = new Subject<Book[]>();

  private books: Book[] = [];

  constructor() {}

  setBooks(books: Book[]) {
    this.books = books;
    this.booksChanged.next(this.books.slice());
  }

  getBooks() {
    return this.books.slice();
  }

  getBook(index: number) {
    return this.books[index-1];
  }


  addBook(book: Book) {
    this.books.push(book);
    this.booksChanged.next(this.books.slice());
  }

  updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.booksChanged.next(this.books.slice());
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    
    this.booksChanged.next(this.books.slice());
  }
}
