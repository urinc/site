import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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

 constructor() {
  
}


ngAfterViewInit(){
  
 
}
   ngOnInit() {
    
   
    
  
     }
 ngOnDestroy(){
  
 }

}
