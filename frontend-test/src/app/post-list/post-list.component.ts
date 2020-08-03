import { PostModel } from './../models/post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  postId: number = null;
  posts: PostModel[];
  private sub: any;
  alive = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readPosts();
    this.route.paramMap
    // .pipe(takeWhile(() => this.alive))
    .subscribe((params) =>
      {
        let pi = Number(params.get('id'));
        console.log("params: ",pi);
      }
    );
      //   this.parentRouteId = +params["id"];
      // });
  }

  readPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {this.posts = posts})
    .catch((err: any) => {
      console.error('An error occurred:', err && err.error);
    });
    ;
  }

  ngOnDestroy() {
    this.alive =false;
  }

}
