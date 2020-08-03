import { PostModel } from './../models/post.model';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges, OnDestroy {
  postId: number = null;
  posts: PostModel[];
  alive = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges() : void {
    this.loadData();
  }

  loadData() {
    this.route.paramMap
    .pipe(takeWhile(() => this.alive))
    .subscribe((params) =>
      {
        if(params)
        this.postId = Number(params.get('id'));
        this.readPosts(this.postId);
      }
    );
  }

  readPosts(postId: number) {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      let arr: PostModel[] = []
      if (postId) {
        arr.push(posts.find((post) => post.id === postId));
        this.posts = arr;
      }
      else {
        this.posts = posts;
      }
    })
    .catch((err: any) => {
      console.error('An error occurred:', err && err.error);
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

  goToPost(postId) {
    if(this.postId) return;
    this.router.navigate([postId], { relativeTo: this.route });
  }

  goToComments() {
    this.router.navigateByUrl(`/comments?postId=${this.postId}`);
  }

}
