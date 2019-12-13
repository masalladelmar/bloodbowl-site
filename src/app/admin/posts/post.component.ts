import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
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

  constructor(
    private commonsService: CommonsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService,
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
          this.hasPhoto = (this.type === 'posts' || this.type === 'photos') && this.item.archive !== null;
          this.commonsService.setLoading(false);
        },
        error => {
          this.commonsService.handleError(
            error.status === 500
              ? 'Se ha producido un error al recuperar el post'
              : error.message
          );
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.h1title = 'Nuevo';
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
  }
}
