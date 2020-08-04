import { PostModel } from './../models/post.model';
import { CommentModel } from './../models/comment.model';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges, OnDestroy {
  postId: number = null;
  post: PostModel;
  comments: CommentModel[];
  alive = true;
  searchText = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.loadData();
  }
  
  ngOnChanges(): void {
   this.loadData();
  }

  loadData() {
    this.route.queryParams
    .pipe(takeWhile(() => this.alive))
    .subscribe((params) =>
      {
        this.postId = Number(params.postId);
        this.readComments(this.postId);
      }
    );
  }

  async readComments(postId: number) {
    await fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => {
      if (postId) {
        this.comments = comments.filter((comment) => comment.postId === postId);
      }
      else {
        this.comments = comments;
      }
    })
    .catch((err: any) => {
      console.error('An error occurred:', err && err.error);
    });
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      this.post = posts.find((post) => post.id === postId);
    })
    .catch((err: any) => {
      console.error('An error occurred:', err && err.error);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  goToHome() {
    this.router.navigateByUrl(`/`);
  }
}
