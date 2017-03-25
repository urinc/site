import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { News } from '../../_Shared/news';
import { DataService } from '../../_Services/data.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})


export class ItemDetailComponent implements OnInit,AfterViewInit {
  shortname: string = "break-news";
  pageUrl: string; 
  ident : string;
  @Input() item: News;

 constructor(private route:ActivatedRoute) {
  
}


ngAfterViewInit(){
  
 window.scrollTo(0, 0 );
}
   ngOnInit() {
    
     this.pageUrl = "http://news/" +this.item.id;
  
     }
 ngOnDestroy(){
  // console.log("Ondestroy -item"  + this.item.id)
 }

}
