import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { PostsService } from 'src/app/services/posts.service';
import { HelperService } from 'src/app/services/helper.service';
import { Match } from 'src/app/models/match.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  match: Match;
  src: string;
  commentform: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private postsService: PostsService,
    public helper: HelperService,
    private fb: FormBuilder
  ) {
    this.commentform = this.fb.group({
      author: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.commonsService.setLoading(true);
    this.route.paramMap.subscribe(
      data => {
        this.match = null;
        this.postsService.getPost(data.get('post')).subscribe(
          response => {
            this.post = response;
            if (this.post.archive) {
              this.src = this.commonsService.photosRoute + this.post.archive;
            }
            this.commonsService.setTitle(response.title);
            if (this.post.match_id) {
              this.postsService.getMatchData(this.post.match_id).subscribe(
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
              ? 'Se ha producido un error al recuperar los datos del post'
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

  get author() {
    return this.commentform.get('author');
  }
  get content() {
    return this.commentform.get('content');
  }

  onSubmit() {
    if (this.commentform.valid) {
      this.postsService.commentPost(this.post.id, this.commentform.get('author').value, this.commentform.get('content').value).subscribe(
        response => {
          this.commonsService.handleSuccess('Comentario guardado, está pendiente de aprobación');
          this.commonsService.setLoading(false);
          this.commentform.get('author').setValue('');
          this.commentform.get('content').setValue('');
        },
        error => {
          this.commonsService.handleError(error.status === 500
            ? 'Se ha producido un error al guardar el comentario'
            : error.message);
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.commonsService.handleError('Debes rellenar nombre y comentario');
    }
  }
}
