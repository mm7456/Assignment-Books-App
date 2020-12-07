import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "/books", pathMatch: "full" },
  // {
  //   path:"books", component:BooksComponent
  // },
  {
    path: "books",
    loadChildren: () =>
      import("./books/books.module").then(m => m.BooksModule)
  },
    {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
