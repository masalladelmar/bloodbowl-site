import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header_title: string;

  constructor() {
    this.header_title = 'BloodBowl';
  }

  ngOnInit() {
  }

}
