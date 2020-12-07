import { Book } from '../book.model';
import {Action} from '@ngrx/store';

export const SET_BOOKS = '[Books] Set Books';
export const UPDATE_BOOK = '[Book] Update Book';
export const ADD_BOOK = '[Book] Add Book';
export const DELETE_BOOK = '[Book] Delete Book';


export class SetBooks implements Action{
    readonly type=SET_BOOKS;

    constructor(public payload : Book[]){

    }
}

export class UpdateBook implements Action{
    readonly type=UPDATE_BOOK;

    constructor(public payload: { uid: number; newBook: Book }) {}

}

export class AddBook implements Action{
    readonly type = ADD_BOOK;
    constructor(public payload: Book) {}

}

export class DeleteBook implements Action{
    readonly type= DELETE_BOOK;
    constructor(public payload: number) {};
}
export type BooksAction=
| SetBooks
| UpdateBook
| AddBook
| DeleteBook;
