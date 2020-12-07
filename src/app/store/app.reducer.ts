import { ActionReducerMap } from '@ngrx/store';
import * as fromBooks  from '../books/store/book.reducer';


export interface AppState{
    books: fromBooks.State;

}

export const appReducer : ActionReducerMap<AppState> ={
books: fromBooks.bookReducer 
};