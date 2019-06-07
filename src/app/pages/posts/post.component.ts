import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { PostsService } from 'src/app/services/posts.service';
import { HelperService } from 'src/app/services/helper.service';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  match: Match;
  src: string;

  constructor(
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private postsService: PostsService,
    public helper: HelperService
  ) {
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
}
