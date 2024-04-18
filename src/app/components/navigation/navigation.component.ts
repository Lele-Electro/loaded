import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from 'src/app/services/user authentication/user-authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  private authListener!: Subscription
  authStatus: boolean = false;

  constructor(private authService: UserAuthenticationService){}

ngOnInit(): void {
  this.authStatus = this.authService.getisAuthenticated()
  this.authListener = this.authService.listenToAuthenticationStatus().subscribe( status => {
    this.authStatus = status;
  })
}

logOut(){
  this.authService.logout();
}

ngOnDestroy(): void {
  this.authListener.unsubscribe();
}
}
