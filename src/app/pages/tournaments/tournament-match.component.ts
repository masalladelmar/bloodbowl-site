import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { Tournament } from 'src/app/models/tournament.model';
import { Subscription } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/app/models/match.model';
import { Post, Photo } from 'src/app/models/post.model';

@Component({
  selector: 'app-tournament-match',
  templateUrl: './tournament-match.component.html',
  styleUrls: ['./tournament-match.component.scss']
})
export class TournamentMatchComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  match: Match;
  photos: Post[];
  chronicle: Post;
  album: Photo[];

  constructor(
    private commonsService: CommonsService,
    private matchesService: MatchesService,
    private route: ActivatedRoute,
    public helper: HelperService,
    // private _lightbox: Lightbox
  ) {
    this.commonsService.setLoading(true);
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.matchesService.getMatch(this.tournament.id, this.route.snapshot.params['match']).subscribe(
          response => {
            this.commonsService.setTitle(response.team_name_1 + ' vs ' + response.team_name_2);
            this.match = response;
            if (this.match.posts) {
              this.photos = this.match.posts.filter(el => el.type === 'photo');
              this.album = [];
              this.photos.forEach(el => {
                const thumb = this.commonsService.photosRoute + helper.thumb(el.archive);
                this.album.push({ src: this.commonsService.photosRoute + el.archive, caption: el.title, thumb: thumb });
              });
              this.chronicle = this.match.posts.find(el => el.type === 'chronicle');
            }
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al recuperar los datos del encuentro');
            this.commonsService.setLoading(false);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toursubscript$.unsubscribe();
  }

  /*open(index: number): void {
    this._lightbox.open(this.album, index);
  }

  close(): void {
    this._lightbox.close();
  }*/
}
