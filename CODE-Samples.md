# Components

The following are exampels of code components which should be used in the MyStore Angular application patterns.

## navigation bar

nv-bar.html

```
<div class="navigation">
  <nav>
    <ul>
      <li><a routerLink="/">Posts</a></li>
      <li><a routerLink="/history">History</a></li>
    </ul>
  </nav>
</div>

```

## PostItem component

post-item.component.html

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

## Post component

post.html

```
<h1>{{ title }}</h1>

<app-post-item
  *ngFor="let post of posts"
  [post]="post"
  (hidePost)="hidePost($event)"
></app-post-item>

<app-create-post (addPost)="addPost($event)"></app-create-post>
```

post.ts

```
import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../services/post';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  title: string = 'Posts';
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    //this.posts = this.postService.getPosts(); -> before Observable implementation
    this.postService.getPosts().subscribe((res) => {
      for (let index = 0; index < res.length; index++) {
        const post = res[index];
        post['votes'] = 1;
      }
      this.posts = res;
    });
  }

  hidePost(post: Post): void {
    this.posts = this.posts.filter((p) => p.id !== post.id);
  }

  addPost(post: Post): void {
    this.posts.unshift(post);
    alert('Post added! thank you.');
  }
}

```

# Models

Post.ts

```
export class Post {
  id: number;
  title: string;
  body: string;
  votes: number;

  constructor() {
    this.id = 1;
    this.title = '';
    this.body = '';
    this.votes = 1;
  }
}
```

# Services

post.ts

```
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=8');
  }
}

```
