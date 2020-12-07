import { DataStorageService } from '../../../shared/data-storage.service';

import { of } from 'rxjs';
import { BookItemComponent} from './book-item.component';

describe('BookItemComponent',()=>{
  let ComponentFixture: BookItemComponent;
  let DataStorageServiceMock: any;
  let storeMock: any
  beforeEach(()=>{
    DataStorageServiceMock={
      fetchBookByUID: jest.fn()
    }

    ComponentFixture = new BookItemComponent(DataStorageServiceMock);

    ComponentFixture.ngOnInit();
  });

  describe('Test: ngOnInit',()=>{
    it('should return book object',done=>{
    const uid = 1;
    const response={
      id: 1
    };
    const httpMock={
      get: jest.fn().mockReturnValue(of(response))
  };

    const fetchBook= jest.spyOn(DataStorageServiceMock,'fetchBookByUID').mockReturnValue(true);
    expect(DataStorageServiceMock.fetchBookByUID([uid])).toBe(true);
    expect(fetchBook).toHaveBeenCalledWith([uid]);
   
      done();
   
  });
  });
});