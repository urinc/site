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
 @Input () loadIndicator;
  static coords: number = 0;
  constructor() { }

  ngOnInit() {
     }


ngAfterViewInit(){
 window.scrollTo(0, ListComponent.coords );
}

ngAfterViewChecked(){

ListComponent.coords = window.pageYOffset;

}

 ngOnDestroy(){
 
 }
ngOnChanges(){

}
}
