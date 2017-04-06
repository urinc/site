import { Component, OnInit, Input, } from '@angular/core';


import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})


export class ShowcaseComponent implements OnInit {

  classOfInitialPage = { showCase: true };


  videoList: News[];
  topCommentedList: News[];
  //@Input() videoList: News[];
  //TODO best from last 15 items;

  counter = 0;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }
  ngOnInit() {
    this.videoList = this.dataService.getVideo();
    this.topCommentedList = this.dataService.getTopComments();
   // setInterval(()=> console.log(this.counter),1000);
  }
  navigateTo(id) {
    this.router.navigate(['/item', id]);
  }
  nextItem() {
        if( this.counter== this.topCommentedList.length-1 ){
           this.counter = 0;
           return;
    }
    this.counter++;
  }

  prevItem() {
    if (this.counter == 0){
        this.counter = this.topCommentedList.length-1;
        
        return;  
    }
    else this.counter--;
  }



}


