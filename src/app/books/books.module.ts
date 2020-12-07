import { BooksComponent } from './books.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { SharedModule } from '../shared/shared.module';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookStartComponent } from './book-start/book-start.component';


@NgModule({
  declarations: [
    BookDetailComponent, 
    BookListComponent, 
    BookEditComponent,
    BooksComponent, 
    BookItemComponent, 
    BookStartComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    SharedModule
  ],
  exports:[
    BooksComponent
  ]
})
export class BooksModule { }
