import { DataStorageService } from './../../../shared/data-storage.service';
import { Book } from '../../book.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;
  @Input() index: number;
  id:number;
  constructor( private dataStorageService: DataStorageService) { }

  ngOnInit(): void {

    this.dataStorageService.fetchBookByUID(this.index).
    subscribe(book =>{
    this.id=book['id'];
    })
  }

}
