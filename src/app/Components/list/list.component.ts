import { Component, OnInit, OnDestroy, Input, OnChanges,AfterViewInit, AfterViewChecked } from '@angular/core';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy , AfterViewInit,AfterViewChecked, OnChanges{
 @Input () itemsList: News[];
 @Input () classOfInitialPage;
  static coords: number = 0;
  constructor() { }

  ngOnInit() {
      console.log("oninit list component ")
    
     }


ngAfterViewInit(){
 window.scrollTo(0, ListComponent.coords );
}

ngAfterViewChecked(){
//console.log(window);
ListComponent.coords = window.pageYOffset;
//console.log("view checked" +window.pageYOffset)
}

 ngOnDestroy(){
 // console.log("destroy list component " + window.pageYOffset)
 // console.log(window.pageYOffset)
 }
ngOnChanges(){
 //console.log(window.scrollY);
}
}
