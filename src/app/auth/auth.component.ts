import {
    Component,
    ComponentFactoryResolver,
    ViewChild,
    OnDestroy
  } from '@angular/core';
  import { Observable, Subscription } from 'rxjs';
  import { NgForm } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService, AuthResponseData } from './auth.service';
  import { User } from './user.model';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
  })
  export class AuthComponent implements OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    private closeSub: Subscription;
    constructor(    private router: Router,
        private authService: AuthService,

    ){}


    ngOnInit(){
     
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
      }

    onSubmit(form: NgForm) {
        if (!form.valid) {
          return;
        }
        const email = form.value.email;
        const password = form.value.password;
    
        let authObs: Observable<AuthResponseData>;
    
        this.isLoading = true;
    
        if (this.isLoginMode) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
    

        authObs.subscribe(
          (resData:AuthResponseData) => {
           console.log(resData.email);
            this.isLoading = false;
          //  console.log("Logged In")
             if(resData[0].email != undefined){
                //console.log("Logged In")
                if (this.isLoginMode) 
                  this.router.navigate(['/books']);
               
            }
            else{
                console.log("Username Password doesn't match")

            }
          },
          errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          }
        );
    
        form.reset();
      }

    ngOnDestroy() {
        if (this.closeSub) {
          this.closeSub.unsubscribe();
        }
      }
   
  }
  