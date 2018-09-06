import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post } from './post.model';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>
    (BACKEND_URL + id);
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string, posts: any, maxPosts: number }>(
      BACKEND_URL + queryParams
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
    this.http.post<{ message: string, postId: string }>
    (BACKEND_URL, post)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };

    this.http.put(BACKEND_URL + id, post)
    .subscribe(response => {
      this.router.navigate(['/']);
    });

  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

}
