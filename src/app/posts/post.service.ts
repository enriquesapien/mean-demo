import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // return a copy of the post array (instead
    // of reference) with spread operator
    return [...this.posts];
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};

    this.posts.push(post);

    this.postsUpdated.next(this.getPosts());

  }

}
