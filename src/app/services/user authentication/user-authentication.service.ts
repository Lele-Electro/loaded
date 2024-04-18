import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User, userInformationOnSignIn } from 'src/models/user';
import { Observable, Subject, tap} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  // readonly baseUrl = 'https://shrouded-eyrie-81070-212f22de6ff8.herokuapp.com';
  readonly baseUrl = 'http://localhost:3000';
  private token: string | null = null;
  private isAuthenticated: boolean= false;
  private tokenTimer!: any
  private authStatusListener = new Subject<boolean>()
  private headers = { 'content-type': 'application/json'}

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  userSignUp(user:User):Observable<HttpResponse<any>> {
    return this.http.post(this.baseUrl + '/api/user/loaded/signup', user, { observe: 'response' } );
  }


  userSignIn(emailAddress:any, password: any) {
    const credentials = {email: emailAddress, password: password}
    return this.http.post<{token: string, expiresIn: number, userInformationOnSignIn: userInformationOnSignIn}>(this.baseUrl + '/api/user/loaded/signin' , credentials).pipe(
      tap(response => {
        console.log('%c SIGN IN AUTHENTICATION API RESPONSE', 'background: gold; padding: 25px');
        console.log(response);
        this.token = response.token;

        if(this.token){
          const expiresInDuration = response.expiresIn;
          this.isAuthenticated = true
          this.authStatusListener.next(true);
          this.setAuthTimer(expiresInDuration)
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)


          this.saveAuthData(
            this.token,
            expirationDate,
            response.userInformationOnSignIn

          )
          console.log('Expiration Date');
          console.log(expirationDate);
          this.router.navigate(['/home'])
        }


      })
    )
  }

  private setAuthTimer(duration: number){
    console.log('%c SETTING TIMER', 'background: green; color:white; font-weight: 800; font-size: 20px')
    console.log('Setting Time' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  listenToAuthenticationStatus(){
    //  asd
    return this.authStatusListener.asObservable()
  }

  getToken() {
    return this.token
  }

  getisAuthenticated(){

    // This method solves the problem of not being able to
    // get the latest information as Auth status only runs on
    // component's initiatialization
// USE THIS IN COMPONENTS (ASSIGN AUTH STATUS VALUE) OTHER THAN NAV
    return this.isAuthenticated
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/signin'])

  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation?.expirationDate ? (authInformation?.expirationDate?.getTime() - now.getTime()) : null
    if(expiresIn && (expiresIn > 0)){
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000)

    }

  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userInformation: userInformationOnSignIn
  )
  {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('name', userInformation.contactPersonName ??'');
    localStorage.setItem('surname', userInformation.contactPersonSurname ?? '');
    localStorage.setItem('company', userInformation.companyName ?? '');
    localStorage.setItem('email', userInformation.email ?? '');
    localStorage.setItem('businessClient', userInformation?.businessClient?.toString() ?? '' )
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('company');
    localStorage.removeItem('email');
    localStorage.removeItem('businessClient');
  }

  public getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    // console.log('%c user information from service', 'background: gold; font-size: 25px')
    // console.log(userInformation)

    if(!token || expirationDate ){
      return
    } else{
      return {
        token: token,
        expirationDate: expirationDate ? new Date(expirationDate) : null
      }
    }
  }
}
