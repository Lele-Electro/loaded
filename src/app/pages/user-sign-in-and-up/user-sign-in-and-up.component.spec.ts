import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSignInAndUpComponent } from './user-sign-in-and-up.component';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatRadioButtonHarness, MatRadioGroupHarness} from '@angular/material/radio/testing';
import {HarnessLoader} from '@angular/cdk/testing';

describe('UserSignInAndUpComponent', () => {
  let component: UserSignInAndUpComponent;
  let fixture: ComponentFixture<UserSignInAndUpComponent>;
  let loader: HarnessLoader;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignInAndUpComponent]
    });
    fixture = TestBed.createComponent(UserSignInAndUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
