import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


describe('Service: AuthService',()=>{

    let service: AuthService;
    let http= jest.fn();
    let routerMock: any;
    let BehaviorSubjectMock: any;
    beforeEach(()=>{
        service =  new AuthService(http as any,routerMock);
        routerMock={
            navigate: jest.fn()
        };
        BehaviorSubjectMock={
            next: jest.fn()
        }


        
    });

    describe('Test: logout',()=>{
        it('shoud clear localStrorage',()=>{
            
            expect(BehaviorSubjectMock.next).toBeDefined();
            service.user=null;
            expect(service.user).toBe(null);
            window.localStorage.removeItem('user');
            expect(window.localStorage.getItem('user')).toBe(null);
            expect(routerMock.navigate).toBeDefined();
        });
    });

    describe('Test: handleAuthentication',()=>{
       
        it('should add user in localStorage',()=>{
            const objUser={
                user:{ email: test,
                 userId: 0 }
             };
            expect(window.localStorage.getItem('user')).toBeFalsy();
            window.localStorage.setItem('user', JSON.stringify(objUser));
            expect(window.localStorage.getItem('user')).toBeTruthy();
        });
    });

    describe('Test: login',()=>{
        it('should return user object',done=>{
            const formData={
                username: 'demo',
                password: 'pass1234'
            };

            const response=[
              { email: 'test',
               id: 0}
                
            ];

            const objUser={
                user:{ email: test,
                 id: 0 }
             };

             const httpMock={
                 get: jest.fn().mockReturnValue(of(response))
             };

             const serviceMock = new AuthService(httpMock as any,routerMock);
             serviceMock.login(formData.username,formData.password).subscribe(data =>{
                 expect(httpMock.get).toBeDefined();
                 expect(httpMock.get).toHaveBeenCalled();
                 expect(data).toEqual(response);

                 window.localStorage.setItem('user', JSON.stringify(objUser));
                 expect(window.localStorage.getItem('user')).not.toBeNull();
                 done();

             })

        });
    });

    describe('Test: signup',()=>{
        it('should save data and return user object',done=>{
            const formData={
                username: 'demo',
                password: 'pass1234'
            };

            const response=[
              { email: 'demo@abc.com',
               id: 0}
                
            ];

            const objUser={
                user:{ email: test,
                 id: 0 }
             };

             const httpMock={
                 post: jest.fn().mockReturnValue(of(response))
             };

             const serviceMock = new AuthService(httpMock as any,routerMock);
             serviceMock.signup(formData.username,formData.password).subscribe(data =>{
                 expect(httpMock.post).toBeDefined();
                 expect(httpMock.post).toHaveBeenCalled();
                 expect(data).toEqual(response);

                 window.localStorage.setItem('user', JSON.stringify(objUser));
                 expect(window.localStorage.getItem('user')).not.toBeNull();
                 expect(routerMock.navigate).toBeDefined();
                 expect(routerMock.navigate).toHaveBeenCalledWith(['/books']);
                 done();

             })

        });
    });

    describe('Test: handleError',()=>{
        it('should return error when username ans password is wronge',()=>{
            
        });
    });

});
