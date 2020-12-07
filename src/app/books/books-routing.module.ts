import { BookStartComponent } from './book-start/book-start.component';
import { BooksResolverService } from './books-resolver.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { BooksComponent } from './books.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component:BooksComponent,
    // canActivate:[AuthGuard],
    children: [
     {path: '', component: BookStartComponent, resolve: [BooksResolverService]},
      {path: 'new', component: BookEditComponent,canActivate: [AuthGuard]},
      {path: ':id', component: BookDetailComponent,resolve: [BooksResolverService],canActivate: [AuthGuard]},
      {path: ':id/edit', component: BookEditComponent, resolve: [BooksResolverService]}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
