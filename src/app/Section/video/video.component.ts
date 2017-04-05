import { Component, OnInit } from '@angular/core';
import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})


export class VideoComponent implements OnInit {

classOfInitialPage = {videoSection :true};

 itemsList:  News[];
 loadIndicator;
  constructor(private dataService : DataService) { 
    
  }




  ngOnInit() {
   this. itemsList = this.dataService.getVideo();
    this.loadIndicator = this.dataService.loadIndicator;
  }

 moreItems() {
    this.dataService.addVideoToArray(5);
    
  }

}





