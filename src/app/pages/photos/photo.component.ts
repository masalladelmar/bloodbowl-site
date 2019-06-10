import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  photo: Post;
  src: string;
  match: Match;
  author: string;
  content: string;
  author_valid: boolean;
  content_valid: boolean;

  constructor(
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private postsService: PostsService,
    public helper: HelperService
  ) {
    this.author_valid = true;
    this.content_valid = true;
    this.commonsService.setLoading(true);
    this.route.paramMap.subscribe(
      data => {
        this.match = null;
        this.postsService.getPhoto(data.get('photo')).subscribe(
          response => {
            this.photo = response;
            this.commonsService.setTitle(response.title);
            this.src = this.commonsService.photosRoute + this.photo.archive;
            if (this.photo.match_id) {
              this.postsService.getMatchData(this.photo.match_id).subscribe(
                response2 => {
                  this.match = response2;
                  this.commonsService.setLoading(false);
                },
                error => {
                  this.commonsService.handleError(error.status === 500
                    ? 'Se ha producido un error al recuperar los datos del encuentro'
                    : error.message);
                  this.commonsService.setLoading(false);
                }
              );
            } else {
              this.commonsService.setLoading(false);
            }
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar los datos de la foto'
              : error.message);
            this.commonsService.setLoading(false);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollIntoView({behavior: 'smooth'});
  }

  comment() {
    if (this.author && this.content) {
      this.postsService.commentPost(this.photo.id, this.author, this.content).subscribe(
        response => {
          this.commonsService.handleSuccess('Comentario guardado, está pendiente de aprobación');
          this.commonsService.setLoading(false);
          this.author = '';
          this.content = '';
          this.author_valid = true;
          this.content_valid = true;
        },
        error => {
          this.commonsService.handleError(error.status === 500
            ? 'Se ha producido un error al guardar el comentario'
            : error.message);
          this.commonsService.setLoading(false);
        }
      );
    } else {
      if (!this.author) {
        this.author_valid = false;
      } else {
        this.author_valid = true;
      }
      if (!this.content) {
        this.content_valid = false;
      } else {
        this.content_valid = true;
      }
      this.commonsService.handleError('Debes rellenar nombre y comentario');
    }
  }
}
