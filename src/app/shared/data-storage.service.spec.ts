import { Store } from '@ngrx/store';
import { DataStorageService } from './data-storage.service';
import { of } from 'rxjs';

describe('Service: DataStorageService',()=>{
    let service: DataStorageService;
    let StoreMock: any;
    const http= jest.fn();

    beforeEach(()=>{
        service = new DataStorageService(http as any,StoreMock);
    });

    describe('Test: updateBook',()=>{
        it('should update book ',done=>{
            const data={
                id: 1,
                book:{
                    name: 'abc',
                    description: 'xyz',
                    author: 'pqr',
                    price: 100,
                    uid: 1
                }
            };

            const response={
                author: test,
                description: test,
                id: test,
                name: test,
                price: test,
                uid: test

            };
            const httpMock={
                put: jest.fn().mockReturnValue(of(response))
            };

            const serviceMock= new DataStorageService(httpMock as any, StoreMock);
            serviceMock.updateBook(data.id,data.book).subscribe(data=>{
                expect(httpMock.put).toBeDefined();
                expect(httpMock.put).toHaveBeenCalled();
                expect(data).toEqual(response);

                done();

        });
    });

});

describe('Test: addBook',()=>{
    it('should add book ',done=>{
 
        const data={
            book:{
                name: 'abc',
                description: 'xyz',
                author: 'pqr',
                price: 100,
                uid: 1
            }
        };
        const response={
            author: test,
            description: test,
            id: test,
            name: test,
            price: test,
            uid: test
            };

        const httpMock={
            post: jest.fn().mockReturnValue(of(response))
        };
        const serviceMock= new DataStorageService(httpMock as any, StoreMock);
        serviceMock.addBook(data).subscribe(data=>{
            expect(httpMock.post).toBeDefined();
            expect(httpMock.post).toHaveBeenCalled();
            expect(data).toEqual(response);

            done();
        });


    });

});

describe('Test: deleteBook',()=>{
    it('should delete book ',done=>{
 
        let id = 1;
        const response={
              
            };

        const httpMock={
            delete: jest.fn().mockReturnValue(of(response))
        };
        const serviceMock= new DataStorageService(httpMock as any, StoreMock);
        serviceMock.deleteBook(id).subscribe(data=>{
            expect(httpMock.delete).toBeDefined();
            expect(httpMock.delete).toHaveBeenCalled();
            expect(data).toEqual(response);

            done();
        });


    });

});

describe('Test: fetchBookByUID',()=>{
    it('should fetch book by uid ',done=>{
 
        let uid = 1;
        const response={
            author: test,
            description: test,
            id: test,
            name: test,
            price: test,
            uid: test
            
            };

        const httpMock={
            get: jest.fn().mockReturnValue(of(response))
        };
        const serviceMock= new DataStorageService(httpMock as any, StoreMock);
        serviceMock.fetchBookByUID(uid).subscribe(data=>{
            expect(httpMock.get).toBeDefined();
            expect(httpMock.get).toHaveBeenCalled();
            expect(data).toEqual(response);

            done();
        });


    });

});

});
