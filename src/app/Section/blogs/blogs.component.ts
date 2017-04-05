import { Component, OnInit } from '@angular/core';
import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})


export class BlogsComponent implements OnInit {

classOfInitialPage = {videoSection :true};

 itemsList:  News[];
 loadIndicator;
  constructor(private dataService : DataService) { 
    this.dataService.addBlogsToArray(10);
    this. itemsList = this.dataService.getBlogs();
    this.loadIndicator = dataService.loadIndicator;

  }

  ngOnInit() {
   
  }

 moreItems() {
    this.dataService.addVideoToArray(5);
    
  }

}
