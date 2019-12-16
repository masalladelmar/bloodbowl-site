import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post, PostBack } from 'src/app/models/post.model';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId: string;
  h1title: string;
  type: string;
  item: Post;
  postform: FormGroup;
  hasPhoto = false;
  matchData;
  public Editor = ClassicEditor;
  public config = {
    language: 'es'
  };

  constructor(
    private commonsService: CommonsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postform = this.fb.group({
      title: ['', Validators.required],
      permalink: ['', Validators.required],
      image: [''],
      content: ['', Validators.required],
      page_title: ['', Validators.required],
      page_keywords: [''],
      page_description: ['', Validators.required],
      status: ['', Validators.required],
      comment_status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.type = data.type;
    });

    this.commonsService.setLoading(true);
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId !== 'new') {
      this.h1title = 'Editar';
      this.postsService.get(this.type, Number(this.postId)).subscribe(
        (response: Post) => {
          this.item = response;
          this.postform.get('title').setValue(this.item.title);
          this.postform.get('permalink').setValue(this.item.permalink);
          this.postform.get('image').setValue(this.item.archive);
          this.postform.get('content').setValue(this.item.content);
          this.postform.get('page_title').setValue(this.item.page_title);
          this.postform.get('page_keywords').setValue(this.item.page_keywords);
          this.postform.get('page_description').setValue(this.item.page_description);
          this.postform.get('status').setValue(this.item.status);
          this.postform.get('comment_status').setValue(this.item.comment_status);
          this.hasPhoto = (this.type === 'posts' || this.type === 'photos') && this.item.archive !== null && this.item.archive !== '';
          this.commonsService.setLoading(false);
        },
        error => {
          this.commonsService.handleError(
            error, 'Se ha producido un error al recuperar el post'
          );
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.h1title = 'Nuevo';
      this.postform.get('status').setValue('published');
      this.commonsService.setLoading(false);
    }
  }

  get title() {
    return this.postform.get('title');
  }
  get permalink() {
    return this.postform.get('permalink');
  }
  get image() {
    return this.postform.get('image');
  }
  get content() {
    return this.postform.get('content');
  }
  get page_title() {
    return this.postform.get('page_title');
  }
  get page_keywords() {
    return this.postform.get('page_keywords');
  }
  get page_description() {
    return this.postform.get('page_description');
  }
  get status() {
    return this.postform.get('status');
  }
  get comment_status() {
    return this.postform.get('comment_status');
  }

  onSubmit() {
    // Submit form
    if (this.postform.valid) {
      this.commonsService.setLoading(true);
      const post: PostBack = {
        title: this.postform.get('title').value,
        permalink: this.postform.get('permalink').value,
        archive: this.postform.get('image').value,
        content: this.postform.get('content').value,
        page_title: this.postform.get('page_title').value,
        page_keywords: this.postform.get('page_keywords').value,
        page_description: this.postform.get('page_description').value,
        status: this.postform.get('status').value,
        comment_status: this.postform.get('comment_status').value,
        type: this.type,
        match_id: null
      };

      if (this.postId === 'new') {
        this.postsService.create(post).subscribe(
          response => {
            this.commonsService.handleSuccess('Post creado');
            this.commonsService.setLoading(false);
            this.router.navigate(['/admin/posts']);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al crear el post');
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.postsService.update(Number(this.postId), post).subscribe(
          response => {
            this.commonsService.handleSuccess('Post actualizado');
            this.commonsService.setLoading(false);
            this.router.navigate(['/admin/posts']);
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al actualizar el post'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
    } else {
      this.commonsService.markFormGroupTouched(this.postform);
      this.commonsService.handleError('Hay campos sin rellenar');
    }
  }
}
