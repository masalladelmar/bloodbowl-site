import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Post, PostsList, PostBack } from '../models/post.model';
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

  public getList(type: string, page = 0, status = 'all', deleted = false): Observable<PostsList> {
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

  public get(type: string, slug: string | number): Observable<Post | Match> {
    if (typeof (slug) === 'number') {
      return this.apiService.get(`chronicles/${slug}`);
    } else {
      return this.apiService.get(`${type}/${slug}`);
    }
  }

  public publish(type: string, id: number, status: string): Observable<void> {
    return this.apiService.patch(`${type}/${id}`, { status: status });
  }

  public commentPost(post_id: number, author: string, content: string): Observable<void> {
    return this.apiService.post(`comment/${post_id}`, { author: author, content: content });
  }

  public create(data: PostBack): Observable<void> {
    return this.apiService.post(`${data.type}`, data);
  }

  public update(postId: number, data: PostBack): Observable<void> {
    return this.apiService.put(`${data.type}/${postId}`, data);
  }
}
