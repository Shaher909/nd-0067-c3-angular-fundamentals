# Post-item child component

post-item.ts

```
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/Post';

@Component({
  selector: 'app-post-item',
  standalone: false,
  templateUrl: './post-item.html',
  styleUrl: './post-item.css',
})
export class PostItem {
  @Input() post!: Post;
  @Output() hidePost = new EventEmitter<Post>();

  constructor() {
    this.post = { id: 0, title: '', body: '', votes: 0 };
  }

  upvote(post: Post): void {
    post.votes += 1;
  }

  downvote(post: Post): void {
    post.votes -= 1;
  }

  hide(post: Post): void {
    this.hidePost.emit(post);
  }
}

```

post-item.html

```
<div style="margin-bttom: 40px">
  <h3>{{ post.title }}</h3>
  <li>{{ post.body }}</li>
  <li>Votes: {{ post.votes }}</li>
  <button class="btn btn-primary" style="margin-right: 10px" (click)="upvote(post)">Upvote</button>
  <button class="btn btn-primary" style="margin-right: 10px" (click)="downvote(post)">
    Downvote
  </button>
  <button class="btn btn-primary" style="margin-right: 10px" (click)="hide(post)">Hide post</button>
  <br />
</div>

```
