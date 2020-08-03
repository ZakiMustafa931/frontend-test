import { CommentModel } from './../models/comment.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
  commentId: number = null;
  comments: CommentModel[];
  alive = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeWhile(() => this.alive))
    .subscribe((params) =>
      {
        if(params)
        this.commentId = Number(params.get('id'));
        this.readComments(this.commentId);
      }
    );
  }

  readComments(commentId: number) {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => {
      let arr: CommentModel[] = []
      if (commentId) {
        arr.push(comments.find((comment) => comment.id === commentId));
        this.comments = arr;
      }
      else {
        this.comments = comments;
      }
    })
    .catch((err: any) => {
      console.error('An error occurred:', err && err.error);
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
