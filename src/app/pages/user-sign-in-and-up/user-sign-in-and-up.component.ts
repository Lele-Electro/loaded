import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user authentication/user-authentication.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule, MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/models/user';
import {MatIconModule} from '@angular/material/icon';
// import { SnackbarMessageComponent } from 'src/app/components/snackbar-message/snackbar-message.component';
// import { backendUser } from 'src/models/user';

@Component({
  selector: 'app-user-sign-in-and-up',
  templateUrl: './user-sign-in-and-up.component.html',
  styleUrls: ['./user-sign-in-and-up.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NgIf,
    NgFor,
    RouterModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    NgClass

  ],
})
export class UserSignInAndUpComponent implements AfterViewInit, OnDestroy {
  userCase!: 'signin' | 'signup';
  isBusinessClient: boolean | null = null;
  @ViewChild('sectionOne')sectionOne!:ElementRef;
  @ViewChild('sectionTwo')sectionTwo!:ElementRef;

  // Form Variables
  form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.minLength,
        Validators.maxLength,
        Validators.email,
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    businessClient: [false, [Validators.required]],
    companyName: ['', [Validators.required]],
    contactPersonName:  ['', [Validators.required]],
    contactPersonSurname:  ['', [Validators.required]],
    contactNumber:  ['', [Validators.required]],

  });

  constructor(
    private userAuthService: UserAuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    // this.userAuthService.userSignUp('asdas', 'asdasd');
    // this.userAuthService.userSignIn('asdas', 'asdasd', false);
    this.determineSignUpOrSignIn();

    if(this.userCase === 'signup')
      {
        this.adjustCompanyNameValidator();

      }

  }

  adjustCompanyNameValidator(){
    this.form.controls.businessClient.valueChanges.subscribe((value) =>{
      if(value){
        this.form.controls.companyName.setValidators(Validators.required);
      } else{
        this.form.controls.companyName.clearValidators();
        this.form.controls.companyName.setValue(null);
      }
    })
  }

  determineSignUpOrSignIn() {
    if (this.router.url === '/signin') {
      this.userCase = 'signin';
      this.redfineRequiredFields();
      this.moveFormRightwards();

    } else if (this.router.url === '/signup') {
      this.userCase = 'signup';

    }
  }

  getErrorList(errorObject: any) {
    if (errorObject) {
      return Object.keys(errorObject);
    } else {
      return ['fine'];
    }
  }

  signUp(){


    if(!this.form.invalid){

       this.userAuthService.userSignUp(this.maptoAuth())
      .subscribe(
        (response) => {
          if (response.status === 201)
            this.openSnackBar('Registration successful...Please sign in', 'positive');
          this.router.navigate(['/signin'])
        },
        (error) => {
          console.log( '%c HTTP ERROR ', 'background: tomato; padding: 25px; font-size: 20px' );
          console.log(error);

          if (error?.error?.error?.errors?.email?.kind! === 'unique') {
            this.openSnackBar('Email Address Taken', 'negative');
          }
        }
      );

    } else {
      console.log( '%c FORM IS NOT VALID', 'background: tomato; padding: 25px; font-size: 20px' );
      console.log(this.form);
    }

  }


  signIn(){

    if(!this.form.invalid){

      this.userAuthService
      .userSignIn( this.form.controls.email.value,  this.form.controls.password.value  )
      .subscribe( (response) => {
       this.openSnackBar('Welcome ' + localStorage.getItem('name') ,'positive')
      },

      (errorResponse) => {
       console.log('%c HTTP ERROR ', 'background: tomato; padding: 25px; font-size: 20px');
       console.log(errorResponse);

         if(errorResponse.status === 401){
           errorResponse as HttpErrorResponse
           this.openSnackBar(errorResponse.error.message , 'negative')
         }

     })


    }else {
      console.log( '%c FORM IS NOT VALID', 'background: tomato; padding: 25px; font-size: 20px' );
      console.log(this.form);
    }

  }


  toggleClientSection(){
    this.isBusinessClient = !this.isBusinessClient;
  }

  maptoAuth(){
    const authUser: User = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      businessClient: this.form.controls.businessClient.value,
      companyName: this.form.controls.companyName.value,
      contactPersonName: this.form.controls.contactPersonName.value,
      contactPersonSurname:this.form.controls.contactPersonSurname.value,
      contactNumber:this.form.controls.contactNumber.value,
    }
    return authUser
  }
  maptoLogin(){
    const credentials: {email: any, password: any} =
    {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    }
    return credentials
  }


  handleResponse(response: any){
    console.log('%c SIGN IN FORM', 'background: goldenrod; padding: 25px; font-size: 25px');
    console.log(response);
    // this.openSnackBar(response.message, 4000)
  }

  openSnackBar(message: string, useCase: 'positive' | 'negative') {
    let panelClass = ''

    if(useCase === 'positive'){
      panelClass = 'snackbar-success'
    } else{
      panelClass = 'snackbar-error'
    }

    this._snackBar.open(message, '',{
      duration: 3500,
      panelClass: [panelClass],
    } );

  }

  redfineRequiredFields(){
    this.form.controls.businessClient.clearValidators();
    this.form.controls.businessClient.updateValueAndValidity();

    this.form.controls.companyName.clearValidators();
    this.form.controls.companyName.updateValueAndValidity();

    this.form.controls.contactPersonName.clearValidators();
    this.form.controls.contactPersonName.updateValueAndValidity();

    this.form.controls.contactPersonSurname.clearValidators();
    this.form.controls.contactPersonSurname.updateValueAndValidity();

    this.form.controls.contactNumber.clearValidators();
    this.form.controls.contactNumber.updateValueAndValidity();
  }

  setForBusinessClient(){
    this.isBusinessClient = true;
    this.form.controls.businessClient.setValue(true);
    setTimeout(() => {
      this.moveFormRightwards();
    }, 450);

  }

  setForNonBusinessClient(){
    this.isBusinessClient = false;
    this.form.controls.businessClient.setValue(false);
    setTimeout(() => {
      this.moveFormRightwards();
    }, 450);

  }

  moveFormRightwards(){
    this.sectionOne.nativeElement.classList.add('section-one-out');
    this.sectionTwo.nativeElement.classList.add('section-two-in');
  }

  ngOnDestroy(): void {

  }
}






