import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { PostsList } from 'src/app/models/post.model';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  type: string;
  posts: PostsList;

  constructor(
    private postsService: PostsService,
    private commonsService: CommonsService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.data.subscribe(data => {
      this.type = data.type;
    });

    this.commonsService.setLoading(true);
    this.postsService.get(this.type, 0).subscribe(
      data => {
        this.posts = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error.status === 500
            ? 'Se ha producido un error al recuperar los posts'
            : error.message
        );
        this.commonsService.setLoading(false);
      }
    );
  }

}
