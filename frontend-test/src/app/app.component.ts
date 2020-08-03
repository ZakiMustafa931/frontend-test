import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-test';
  jsonRead: any;

  ngOnInit() { }

  readJSON() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {this.jsonRead = json
      console.log("dumb cats: ",JSON.stringify(this.jsonRead));
    });
  }
  
}
