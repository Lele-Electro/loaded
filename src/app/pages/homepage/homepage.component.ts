import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from 'src/app/services/user authentication/user-authentication.service';
import { userInformationOnSignIn } from 'src/models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{
userInformation!: userInformationOnSignIn | undefined

constructor(private authService: UserAuthenticationService){}
  ngAfterViewInit(): void {

    this.userInformation =  {

        contactPersonName: localStorage.getItem('name'),
        contactPersonSurname: localStorage.getItem('surname'),
        businessClient: localStorage.getItem('businessClient') === 'true' ? true : false,
        email: localStorage.getItem('email'),
        companyName:localStorage.getItem('company')


    }
  }
}
