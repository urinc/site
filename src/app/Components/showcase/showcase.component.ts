import { Component, OnInit, Input,  } from '@angular/core';


import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})


export class ShowcaseComponent implements OnInit{

 classOfInitialPage = {showCase :true};
// itemList : News[];
 videoList: News[];
 topCommentedList: News[];
  //@Input() videoList: News[];
    //TODO best from last 15 items;
    
 counter =0;
 
  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
   this.videoList=this.dataService.getVideo();
   this.topCommentedList = this.dataService.getTopComments();
  // this.itemList[0] = this.dataService.getTopComments()[0];

  //setInterval(()=> console.log(this.topCommentedList),30);



  }

  navigateTo(id) {
    
    this.router.navigate(['/item', id]);
   
  }

 nextItem(){

 }

 prevItem(){

 }



}


