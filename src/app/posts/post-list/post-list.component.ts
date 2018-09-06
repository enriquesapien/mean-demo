import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ];

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, 1);
    this.postsSub = this.postService
      .getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
