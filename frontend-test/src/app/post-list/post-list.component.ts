import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any;

  constructor() { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {this.posts = json
      console.log("dumb cats: ",JSON.stringify(this.posts));
    });
  }

}
