import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './services/user authentication/user-authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'loaded';

  constructor(
    private authService: UserAuthenticationService,
    private snackBar: MatSnackBar

  ){}
  ngOnInit(): void {
    this.authService.autoAuthUser();

    if(window.matchMedia('(display-mode:browser').matches) {
      // we are in the browser
      if('standaline' in navigator){
      // only available in Safari
      this.snackBar.open('Install the App? :)', '',{duration: 3000})

      } else {
        // We are not on Safari
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();

        const sb =  this.snackBar.open('Install the App? :)', '',{duration: 3000});
          sb.onAction().subscribe( () => {
          (event as any).prompt();
          (event as any).userChoice.then ( (result:any) => {
            if(result.outcome == 'dismissed'){
              ///DO THIS
            } else{
              //Do THAT
            }
          })
          })
        })
      }
    }
  }
}
