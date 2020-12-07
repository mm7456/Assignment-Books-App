import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookEditComponent } from './book-edit.component';
import { Component } from '@angular/Core';



describe('BookEditComponent',()=>{
  let fixture: any;
  let component: any;
    let routerMock: any;
  let routeMock: ActivatedRoute;
  let dataStorageServiceMock: any;
  let storeMock: any;
  let formGroupMock: any;
  let initFormMock: any;

  const mockActivatedRoute = {
    params: {
      subscribe: jest.fn()
    }
  };

  initFormMock=
  {initForm: jest.fn()};

  routerMock={
    navigate:jest.fn()
  };

  dataStorageServiceMock={
    fetchBookByUID: jest.fn(),
    updateBook: jest.fn(),
    addBook: jest.fn()
  };


  beforeEach(async(()=>{

    TestBed.configureTestingModule({
      imports: [ BrowserModule,
        FormsModule,
        ReactiveFormsModule],
			declarations: [
        FormGroup,
        BookEditComponent
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
		}).compileComponents();
		fixture = TestBed.createComponent(BookEditComponent);
		component = fixture.debugElement.componentInstance;

  }));

  describe('Test: ngOnInit',()=>{
    it('should get queryParams',fakeAsync(done=>{
      
      jest.spyOn(mockActivatedRoute.params,'subscribe').mockReturnValue(of(EMPTY));
      mockActivatedRoute.params.subscribe(param=>{
        expect(initFormMock.initForm).toHaveBeenCalled();
      });
      done();

    }));

    it('should initialize editMode to false',()=>{
      expect(component.editMode).toBe(false);
    })
  
  });

});
