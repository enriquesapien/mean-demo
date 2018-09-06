import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string, posts: any }>(
      'http://localhost:3000/api/posts' + queryParams
    )
    .pipe(map((postData) => {
      // transform each post element in the array
      return postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });

  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      post.id = responseData.postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };

    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      // remove deleted post
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next([...this.posts]);
    });
  }

}
