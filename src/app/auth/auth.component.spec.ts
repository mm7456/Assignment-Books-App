import { AuthComponent } from './auth.component';


describe('AuthComponent', ()=>{
    let fixture: AuthComponent;
    let authServiceMock: any;
    let routerMock: any;

    beforeEach(()=>{
        authServiceMock={
            login: jest.fn()
        }

        routerMock=jest.fn();

        fixture= new AuthComponent(
            authServiceMock,
            routerMock
        );
        fixture.ngOnInit();
    });

        describe('Test: ngOnInit', ()=>{

        });

        describe('Test: Login Form', ()=>{
            it('should invalidate the form',()=>{

            })
        });

        describe('Test: Form Valid', ()=>{
            it('should call onSubmit', ()=>{
                const formData={
                    email: 'demo',
                    password: 'pass1234'
                };

                const spyLogin=jest.spyOn(authServiceMock,'login').mockReturnValue(true);
                expect(authServiceMock.login(formData.email,formData.password)).toBe(true);
                expect(spyLogin).toHaveBeenCalledWith(formData.email,formData.password);
            });
        });
});
