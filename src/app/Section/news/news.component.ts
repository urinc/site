import { Component, OnInit } from '@angular/core';
import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

 
classOfInitialPage = {mainSection :true};

 itemsList:  News[];
loadIndicator;
  constructor(private dataService : DataService) { 
    this.dataService.addOnlyNewsToArray(10);
    this. itemsList = this.dataService.getOnlyNews();
    this.loadIndicator = dataService.loadIndicator;
  }

  ngOnInit() {
   
  }

 moreItems() {
    this.dataService.addOnlyNewsToArray(10);
    
  }

}
