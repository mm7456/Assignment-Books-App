import { AppComponent } from './app.component';
import { async, TestBed } from '@angular/core/testing';

describe('AppComponent',()=>{
  let fixure: any;
  let component: any;

  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    }).compileComponents();
    fixure=TestBed.createComponent(AppComponent);
  }));

  describe('Test: Component',()=>{
    it('should be initialized', ()=>{
      expect(fixure).toBeTruthy();
      fixure.detectChanges();
      const compiled = fixure.debugElement.nativeElement;
    });
  });
});