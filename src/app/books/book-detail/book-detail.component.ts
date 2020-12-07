import { BooksAction } from '../store/book.actions';
import { DataStorageService } from '../../shared/data-storage.service';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as BooksActions from '../store/book.actions';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book:Book;
  id:number;
  constructor( // private bookService: BookService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<fromApp.AppState>,
                private dataStorageService: DataStorageService
              ) { }

  ngOnInit(): void {
   
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('books');
        }),
        map(booksState => {
          return booksState.books.find((book, index) => {
            return book.uid === this.id;
          });
        })
      )
      .subscribe(book => {
        this.book = book;
      });

   
  }

  onEditBook() {
    this.router.navigate(['edit'], {relativeTo: this.route});

  }

  onDeleteBook() {

    this.dataStorageService.fetchBookByUID(this.id).subscribe(book=>{

      let id=book[0]['id'];

      this.dataStorageService.deleteBook(id)
    .subscribe(res => { 
      // console.log('onDelete response',res.toString);
      
      this.store.dispatch(new BooksActions.DeleteBook(this.id));  
      this.router.navigate(['/books']);

    });


    });

    
  }

}
