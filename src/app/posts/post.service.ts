import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string, posts: any, maxPosts: number }>(
      'http://localhost:3000/api/posts' + queryParams
    )
    .pipe(map((postData) => {
      // transform each post element in the array
      return { posts: postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      }), maxPosts: postData.maxPosts };
    }))
    .subscribe(transformedPostsData => {
      this.posts = transformedPostsData.posts;
      this.postsUpdated.next({
        posts: [...this.posts],
        postCount: transformedPostsData.maxPosts
      });
    });
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };

    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(response => {
      this.router.navigate(['/']);
    });

  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }

}
