import { Component, OnInit } from '@angular/core';
import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit {

   
  classOfInitialPage = { mainSection: true };
  loadIndicator;
  itemsList: News[];
  videoList: News[];
  constructor(private dataService: DataService) {
  this.loadIndicator = dataService.loadIndicator;
   
  }

  ngOnInit() {
     this.itemsList = this.dataService.getData();
     this.videoList = this.dataService.getVideo();
   
  }
 
  moreItems() {
    this.dataService.getLastItems(25);
    
  }
  
}

