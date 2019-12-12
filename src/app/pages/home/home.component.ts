import { Component, OnInit } from '@angular/core';
import { PostsList } from 'src/app/models/post.model';
import { CommonsService } from 'src/app/services/commons.service';
import { PostsService } from 'src/app/services/posts.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: PostsList;
  page: number;
  totalPages: number;

  constructor(
    private commonsService: CommonsService,
    private postsService: PostsService,
    public helper: HelperService,
  ) {
    this.page = 1;
    this.commonsService.setTitle('Portada');
    this.loadPosts();
  }

  ngOnInit() {
  }

  cutContent(content: string): string {
    return content.replace(/(<([^>]+)>)/ig, '');
  }

  loadPage(num: number) {
    if (num !== this.page) {
      this.page = num;
      this.loadPosts();
    }
  }

  private loadPosts() {
    this.commonsService.setLoading(true);
    this.postsService.get('posts', this.page, 'published').subscribe(
      data => {
        this.posts = data;
        this.totalPages = Math.ceil(this.posts.total_items / 10);
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los posts'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }
}
