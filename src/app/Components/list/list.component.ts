import { Component, OnInit, OnDestroy, Input, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, OnChanges {

  @Input() itemsList: News[];
  @Input() classOfInitialPage;
  @Input() loadIndicator;

 counter=0;

  static coords: number = 0;
  upButtonVisibility: boolean = false;

  constructor() { }

  ngOnInit() { }


  ngAfterViewInit() {
    window.scrollTo(0, ListComponent.coords);
    
  }

  ngAfterViewChecked() {
  
   
    if (!this.classOfInitialPage.thumbNail) {
    ListComponent.coords = window.pageYOffset;
    
    if ((window.pageYOffset>1200 && this.upButtonVisibility ==false )){
          this.upButtonVisibility=true};
    if ((window.pageYOffset<1100  && this.upButtonVisibility ==true)){
          this.upButtonVisibility=false};
    }

  }


  scrollToTop(){
    window.scrollTo(0, 0);
  }
  ngOnDestroy() {

  }
  ngOnChanges() {

  }



}
