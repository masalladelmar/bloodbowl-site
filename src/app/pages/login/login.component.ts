import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  private auth2: any;

  constructor(
    private commonsService: CommonsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (localStorage.getItem('googleToken')) {
      // Ya está logueado
      this.router.navigate(['/admin']);
    }

    this.commonsService.setTitle('Login');
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/platform.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => {
      this.googleInit();
    };

    const metaclientid = document.createElement('meta');
    metaclientid.name = 'google-signin-client_id';
    metaclientid.content = environment.google_client_id;

    document.head.appendChild(metaclientid);
    document.head.appendChild(gapiScript);

    this.loginform = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init();
      console.log(this.auth2);
      this.attachSignin(document.getElementById('google-sign-in'));
    });
  }

  private attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();

        if (!localStorage.getItem('googleToken')) {
          localStorage.setItem('googleToken', googleUser.getAuthResponse().id_token);
          localStorage.setItem('googleName', profile.getName());
          localStorage.setItem('googleAvatar', profile.getImageUrl());
        } else {
          this.router.navigate(['/admin']);
        }
      }, (error) => {
        console.error(error);
      });
  }

  get user() {
    return this.loginform.get('user');
  }
  get password() {
    return this.loginform.get('password');
  }

  onSubmit() {
    if (this.loginform.valid) {

    } else {

    }
  }
}
