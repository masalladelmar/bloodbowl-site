import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Post, PostsList } from '../models/post.model';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private apiService: ApiService
  ) { }

  public getPhotos(page: number): Observable<PostsList> {
    return this.apiService.get(`photos/${page}`);
  }

  public getPosts(page: number): Observable<PostsList> {
    return this.apiService.get(`posts/${page}`);
  }

  public getPhoto(photo: string): Observable<Post> {
    return this.apiService.get(`photos/${photo}/detail`);
  }

  public getPost(post: string): Observable<Post> {
    return this.apiService.get(`posts/${post}/detail`);
  }

  public getMatchData(match_id: number): Observable<Match> {
    return this.apiService.get(`posts/match/${match_id}`);
  }

  public commentPost(post_id: number, author: string, content: string): Observable<void> {
    return this.apiService.post(`comment/${post_id}`, {author: author, content: content});
  }
}
