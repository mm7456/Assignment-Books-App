//import { State } from '@ngrx/store';
import { Book } from '../book.model';
import * as BooksActions from './book.actions';
export interface State{
    books: Book[];
    author: string;
}

const initialState: State= {
    books: [],
    author: 'Mahesh'
}   


export function bookReducer(state= initialState,action: BooksActions.BooksAction){
//    return state;

switch(action.type){
    case BooksActions.SET_BOOKS:
        return {
            ...state,
            books:[...action.payload]
        };

    case BooksActions.UPDATE_BOOK:
        const updatedBook ={
            ...state.books.filter((book, id)=>  {return book.uid == action.payload.uid;}),
            ...action.payload.newBook
        };
        
        const updatedBooks=[...state.books];
        
        for(let a=0; a< updatedBooks.length; a++) {
            if(updatedBooks[a].uid === action.payload.uid) {
                updatedBooks[a] = updatedBook;
                break;
            }
                
        }

        return {
            ...state,
            books: updatedBooks
        };
    
    case BooksActions.ADD_BOOK:
        return {
                ...state,
                books: [...state.books, action.payload]
        };
    
    case BooksActions.DELETE_BOOK:
        return {
            ...state,
            books: state.books.filter((book, id) =>{
                return book.uid !== action.payload;
            })
        };
        

    default: return state;
}
}
