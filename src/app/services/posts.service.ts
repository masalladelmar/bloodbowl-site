import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Post, PostsList } from '../models/post.model';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(type: string, page = 0, status = 'all', deleted = false): Observable<PostsList> {
    let params = new HttpParams();

    if (status !== 'all') {
      params = params.set('status', status);
    }
    if (deleted) {
      params = params.set('deleted', '0');
    }
    if (page !== 0) {
      params = params.set('page', page.toString());
    }

    return this.apiService.get(`${type}`, params);
  }

  public getPhoto(photo: string): Observable<Post> {
    return this.apiService.get(`photos/${photo}/detail`);
  }

  public getPost(post: string): Observable<Post> {
    return this.apiService.get(`posts/${post}/detail`);
  }

  public getMatchData(match_id: number): Observable<Match> {
    return this.apiService.get(`matches/${match_id}`);
  }

  public commentPost(post_id: number, author: string, content: string): Observable<void> {
    return this.apiService.post(`comment/${post_id}`, { author: author, content: content });
  }
}
