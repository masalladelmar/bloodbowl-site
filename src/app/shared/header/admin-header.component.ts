import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  header_title = 'Ría de Nurgle';
  tournaments: Tournament[];
  user = localStorage.getItem('googleName');
  image = localStorage.getItem('googleAvatar');

  constructor(
    private tournamentService: TournamentsService,
    private router: Router
  ) {
    this.tournamentService.getTournaments().subscribe(
      response => this.tournaments = response,
      error => {}
    );
  }

  ngOnInit() {
  }

  toggle_menu(target: HTMLElement) {
    target.parentElement.classList.toggle('active');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
