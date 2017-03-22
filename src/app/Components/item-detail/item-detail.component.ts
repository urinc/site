import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { News } from '../../_Shared/news';
import { DataService } from '../../_Services/data.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})


export class ItemDetailComponent implements OnInit {
  shortname: string = "break-news";
  pageUrl: string; 

  @Input() item: News;

 constructor(private route:ActivatedRoute) {
  console.log(route);
}
   ngOnInit() {
     this.pageUrl = "http://195.138.78.131/newsApp/#/item/" +this.item.id;
    console.log("Onitnit -item " + this.pageUrl)
     }
 ngOnDestroy(){
  // console.log("Ondestroy -item"  + this.item.id)
 }



}
