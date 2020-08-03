import { PostModel } from './../models/post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: PostModel[];

  constructor() { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {this.posts = json
      console.log("post list: ",JSON.stringify(this.posts));
    })
    .catch((err: any) => {
      console.error('An error occurred:', err && err.error);
    });
    ;
  }

}
