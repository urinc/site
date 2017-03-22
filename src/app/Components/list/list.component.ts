import { Component, OnInit, OnDestroy, Input, } from '@angular/core';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
 @Input () itemsList: News[];
 @Input () classOfInitialPage;
  
  constructor() { }

  ngOnInit() {
    console.log("Onitnit -list")
     }
 ngOnDestroy(){
   console.log("Ondestroy -list");
    //window.scrollTo(0,0);
 }

}
