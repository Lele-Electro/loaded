import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './services/user authentication/user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'loaded';

  constructor(private authService: UserAuthenticationService){}
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
