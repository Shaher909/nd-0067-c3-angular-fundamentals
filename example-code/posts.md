# Posts component (parent component)

postos.ts

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

posts.html

```
<h1>{{ title }}</h1>

<app-post-item
  *ngFor="let post of posts"
  [post]="post"
  (hidePost)="hidePost($event)"
></app-post-item>

<app-create-post (addPost)="addPost($event)"></app-create-post>
```
