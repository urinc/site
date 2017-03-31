import { Component, ElementRef, ViewChild, OnInit, Renderer, Input, AfterViewInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 import {Observable} from "rxjs/Rx";

import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';



@Component({
  selector: 'app-top-commented',
  templateUrl: './top-commented.component.html',
  styleUrls: ['./top-commented.component.css']
})
export class TopCommentedComponent implements OnInit {

  itemsList: News[];

  classOfInitialPage = { mainSection: true };
  constructor(private dataService: DataService,
               private http: Http,
               private el: ElementRef,
               private renderer: Renderer     
  ) {
  this.itemsList = this.dataService.getLastWeeks();

  }

  ngOnInit() {
     this.getUser().subscribe(data => console.log(data));
  }




getUser() {
      //console.log("hcount")
    let url = "https://break-news.disqus.com/count-data.js?2=http://195.138.78.131/newsApp/item/29";
    let url1=  'http://api.worldbank.org/countries/us/indicators/SH.XPD.PRIV.ZS?date=2000:2002&format=jsonP&prefix=JSONP_CALLBACK'
    let url2 = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&lang=en&callback=JSONP_CALLBACK"
    let url3 = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=JSONP_CALLBACK'
   
    return this.http.get(url)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));




    
  }



















disqWidgetCreate() {
    if ((<any>window).DISQUSWIDGETS === undefined) {
      (<any>window).DISQUSWIDGETS = {};
      let self = this;
      (<any>window).DISQUSWIDGETS.displayCount = function (response) {
        if (response.counts.length > 0) {
          let count = response.counts[0].comments;
          console.log(response.counts[0]);
        }
      }
    }
  }

  addScriptCounter(url) {
    let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src =  `https://break-news.disqus.com/count-data.js?
                   2=http://195.138.78.131/newsApp/item/` + url;
    script.async = true;
    script.type = 'text/javascript';
  }









}
