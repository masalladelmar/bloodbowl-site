import { Component, OnInit, NgZone } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private auth2: any;

  constructor(
    private commonsService: CommonsService,
    private zone: NgZone,
    private router: Router,
    private usersService: UsersService
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
  }

  ngOnInit() {
  }

  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init();
      this.attachSignin(document.getElementById('google-sign-in'));
    });
  }

  private attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.zone.run(() => (this.commonsService.setLoading(true)));
        const profile = googleUser.getBasicProfile();

        this.usersService.verifyUser(profile.getEmail()).subscribe(
          response => {
            if (!localStorage.getItem('googleToken')) {
              localStorage.setItem('googleToken', googleUser.getAuthResponse().id_token);
              localStorage.setItem('googleName', profile.getName());
              localStorage.setItem('googleAvatar', profile.getImageUrl());
            }

            let url: string;
            if (this.commonsService.getReturnUrl()) {
              url = this.commonsService.getReturnUrl();
            } else {
              url = '/admin';
            }
            this.zone.run(() => this.router.navigate([url]));
            this.zone.run(() => this.commonsService.setLoading(false));
          },
          error => {
            this.commonsService.handleError('La cuenta que has usado no tiene permiso');
            this.zone.run(() => this.commonsService.setLoading(false));
          }
        );
      }, (error) => {
        console.error(error);
        this.zone.run(() => this.commonsService.setLoading(false));
      });
  }
}
