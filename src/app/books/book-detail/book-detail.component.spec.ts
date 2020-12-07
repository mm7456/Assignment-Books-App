import { DataStorageService } from './../../shared/data-storage.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BookDetailComponent } from './book-detail.component';
import { convertToParamMap } from '@angular/router';

describe('BookDetailComponent', () => {
  let fixture: BookDetailComponent;
  let routeMock: any;
  let routerMock: any;
  let storeMock: any;
  let dataStorageServiceMock: any;
  let httppMock: any;


  beforeEach(() => {
    const response={
      book:{
        name: 'abc',
        description: 'xyz',
        author: 'pqr',
        price: 100,
        uid:1
      }
    };

    dataStorageServiceMock={
      fetchBookByUID: jest.fn(),
      deleteBook: jest.fn()
    };

    storeMock={
      dispatch: jest.fn(),
      select: jest.fn()
    };

    routerMock={
      navigate: jest.fn()
    };


    routeMock={
      params: of(response)
    };

    fixture= new BookDetailComponent(
      routeMock,
      routerMock,
      storeMock,
      dataStorageServiceMock
    );

    fixture.ngOnInit();
  });

  describe('Test: ngOnInit',()=>{
    it('should get params',()=>{
      expect(routeMock.params).toBeTruthy();
    });

  });


 describe('Test: onEditBook',()=>{
  it('should call navigate',()=>{
    expect(routerMock.navigate).toBeDefined();
  });
 });

 describe('Test: onDeleteBook',()=>{
  it('should delete book',done=>{

    const response={
      book:{
        name: 'abc',
        description: 'xyz',
        author: 'pqr',
        price: 100,
        uid:1,
        id:1
      }
    };

    const onDeleteResponse={};

    const httpMock = {
      get: jest.fn().mockReturnValue(of(response))
    };

    const httpMock2 = {
      delete: jest.fn().mockReturnValue(of(onDeleteResponse))
    };
     dataStorageServiceMock = new DataStorageService(httpMock as any ,storeMock);
    dataStorageServiceMock.fetchBookByUID(1).subscribe(data=>{
      expect(httpMock.get).toBeDefined();
      expect(httpMock.get).toHaveBeenCalled();
      expect(data).toEqual(response);
         done();

    //   })

    })
  });
 });
});