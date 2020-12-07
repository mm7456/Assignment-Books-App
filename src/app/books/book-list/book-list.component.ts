import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit,OnDestroy {

  books: Book[];
  subscription: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store : Store<fromApp.AppState> ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('books')
    .pipe(map(booksState => booksState.books))
      .subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
    console.log('Books :', this.books);
  }

  onNewBook() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
