import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private apiService: ApiService
  ) { }

  public getPhotos(): Observable<Post[]> {
    return this.apiService.get('photos');
  }

  public getPhoto(photo: string): Observable<Post> {
    return this.apiService.get(`photos/${photo}`);
  }
}
