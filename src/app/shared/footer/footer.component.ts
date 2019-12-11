import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  route: string;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    if (!localStorage.getItem('googleToken')) {
      this.route = '/login';
    } else {
      this.route = '/admin';
    }
  }

}
