import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { PostsService } from 'src/app/services/posts.service';
import { Post, Photo } from 'src/app/models/post.model';
import { HelperService } from 'src/app/services/helper.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos: Post[];
  album: Photo[];

  constructor(
    private commonsService: CommonsService,
    private postsService: PostsService,
    public helper: HelperService,
    private _lightbox: Lightbox
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Galería de la comunidad');
    this.postsService.getPhotos().subscribe(
      data => {
        this.photos = data;
        this.album = [];
        this.photos.forEach(el => {
          const thumb = this.commonsService.photosRoute + helper.thumb(el.archive);
          this.album.push({src: this.commonsService.photosRoute + el.archive, caption: el.title, thumb: thumb});
        });
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar las fotos de la galería'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }

  open(index: number): void {
    this._lightbox.open(this.album, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
