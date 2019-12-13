import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { PostsList, Post } from 'src/app/models/post.model';
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
    this.postsService.getList(this.type, 0).subscribe(
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

  publish(data: Post) {
    const newStatus = data.status === 'published' ? 'private' : 'published';
    this.commonsService.setLoading(true);
    this.postsService.publish(this.type, data.id, newStatus).subscribe(
      _ => {
        this.commonsService.handleSuccess('Estado de publicación actualizado');
        data.status = newStatus;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error.status === 500
            ? 'Se ha producido un error al actualizar el estado de publicación'
            : error.message
        );
        this.commonsService.setLoading(false);
      }
    );
  }
}
