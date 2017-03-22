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
 

  @Input() item: News;

  constructor() { 

  }
   ngOnInit() {
    console.log("Onitnit -item")
     }
 ngOnDestroy(){
   console.log("Ondestroy -item")
 }



}
