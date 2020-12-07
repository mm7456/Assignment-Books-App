import { Book } from './book.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


import { DataStorageService } from '../shared/data-storage.service';
import { BookService } from './book.service';

@Injectable({ providedIn: 'root' })
export class BooksResolverService implements Resolve<Book[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private bookService: BookService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const books = this.bookService.getBooks();

    if (books.length === 0) {
      return this.dataStorageService.fetchBooks();
    } else {
      return books;
    }
  }
}
