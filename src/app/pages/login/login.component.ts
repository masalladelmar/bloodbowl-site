import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;

  constructor(
    private commonsService: CommonsService,
    private fb: FormBuilder
  ) {
    this.commonsService.setTitle('Login');
    this.loginform = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
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
