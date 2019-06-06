import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { Tournament } from 'src/app/models/tournament.model';
import { Subscription } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/app/models/match.model';
import { Post } from 'src/app/models/post.model';
import { Lightbox } from 'ngx-lightbox';

interface Photo {
  src: string;
  caption: string;
  thumb: string;
}

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
  photosRoute = '/uploads/photos/';

  constructor(
    private commonsService: CommonsService,
    private matchesService: MatchesService,
    private route: ActivatedRoute,
    public helper: HelperService,
    private _lightbox: Lightbox
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
                const thumb = this.photosRoute +
                    el.archive.substr(0, el.archive.lastIndexOf('.')) + '_thumb' +
                    el.archive.substr(el.archive.lastIndexOf('.'));
                this.album.push({src: this.photosRoute + el.archive, caption: el.title, thumb: thumb});
              });
              this.chronicle = this.match.posts.find(el => el.type === 'chronicle');
            }
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar los datos del encuentro'
              : error.message);
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

  open(index: number): void {
    this._lightbox.open(this.album, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
