import { Book } from './../book.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from './../../shared/data-storage.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as BooksActions from '../store/book.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  id: number;
  editMode = false;
  bookForm: FormGroup;
  private storeSub: Subscription;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    
    console.log("On Submit 1");
    if (this.editMode) {
      console.log("On Submit 2 Edit Mode");
      
      this.dataStorageService.fetchBookByUID(this.id).subscribe(book=>{
        let id=book[0]['id'];
        // console.log('Id from Edit', id);
        // console.log('Form value from Edit', this.bookForm.value);

        // console.log('Book from Edit', book[0]);
        let bookobj = this.bookForm.value;
        bookobj['uid'] = book[0]['uid'];
        this.dataStorageService.updateBook(id, bookobj).subscribe(res => {
         console.log('UpdateBook response ',res);
          
          bookobj['id'] = id;
          this.store.dispatch(
            new BooksActions.UpdateBook({
              uid: this.id,
              newBook: bookobj
            })
          );
         
        });
      })
      


    } else {
      console.log("On Submit 3");

      console.log(this.bookForm.value);

          let bookobj = new Book(
            this.bookForm.get('name').value,
            this.bookForm.get('description').value,
            this.bookForm.get('author').value,
            this.bookForm.get('price').value,
            this.dataStorageService.bookId+1);


          this.dataStorageService.addBook(bookobj).subscribe(res => {
            console.log("On Submit 6",res);
            this.store.dispatch(new BooksActions.AddBook(bookobj));

          });
    }

   this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private initForm() {
    let bookName = '';

    let bookDescription = '';
    let bookAuthor = '';
    let bookPrice = 0;

    if (this.editMode) {
      console.log("id ", this.id);

      this.storeSub = this.store
        .select('books')
        .pipe(
          map(bookState => {
            return bookState.books.find((book, index) => {
              return book.uid === this.id;
            });
          })
        ).subscribe(book => {
          bookName = book.name;
          bookDescription = book.description;
          bookAuthor = book.author;
          bookPrice = book.price;

        });
    }

    this.bookForm = new FormGroup({
      name: new FormControl(bookName, Validators.required),
      description: new FormControl(bookDescription, Validators.required),
      author: new FormControl(bookAuthor, Validators.required),
      price: new FormControl(bookPrice, Validators.required)

    });
  }
}
