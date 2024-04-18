import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignInAndUpComponent } from './pages/user-sign-in-and-up/user-sign-in-and-up.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin' },
  {path: 'signin', component: UserSignInAndUpComponent},
  {path: 'signup', component: UserSignInAndUpComponent},
  {path: 'home', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
