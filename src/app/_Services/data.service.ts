import { Injectable, ElementRef, Renderer  } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {DOCUMENT} from '@angular/platform-browser'

import { News } from '../_Shared/news'

@Injectable()
export class DataService {
  item: News;
  items: FirebaseListObservable<any>;

  static videoLimiToLast = 0;
  static onlyNewsLimiToLast = 0;
  static articlesLimiToLast = 0;
  static blogsLimiToLast = 0;
  NEWS: News[] = [];
  onlyNews: News[] = [];
  video: News[] = [];
  calendar: News[] = [];
  blogs: News[] = [];
  lastweeks : News[] =[];
  commentsCounter = [];

  loadIndicator = { state: false };

  constructor( //private document: Document,
    private angularFire: AngularFire,
              private http: Http,
              
            //  private el: ElementRef,
            //  private renderer: Renderer   
            ) {
  //  this.disqWidgetCreate();
    this.getInitialLastItems(5);
    this.items = angularFire.database.list('/items');
    this.addVideoToArray(6);
    this. addToLastWeeks(14);
  }
  getQuery(category: string, limiToLast: number): {} {
    return {
      query: { orderByChild: 'category', equalTo: category, limitToLast: limiToLast }
    }
  }
  private getInitialLastItems(quantityInitial): void {
    this.loadIndicator.state = true;
    this.angularFire.database.list('/items', {
      query: {
        orderByChild: 'id',
        limitToLast: quantityInitial,          // initial items quantityInitial
      }
    }).subscribe(list => (list.forEach(element => this.unshiftUniqueItem(element, this.NEWS))))
    //subscribe(list => this.pushUniqueList(this.reverseList(list), this.NEWS));

  }
  pushUniqueList(list: any[], array: any[]): void {
    list.forEach(element => this.pushUniqueItem(element, array))
    this.loadIndicator.state = false;

  }
  unshiftUniqueItem(item, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) { return }
    }
    array.unshift(item);
    if (this.loadIndicator.state) this.loadIndicator.state = false;
  }
  pushUniqueItem(item, array: any[]): void {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) { return }
    }
    array.push(item);
  }
  reverseList(list: any[]): any[] {
    let tmp = [];
    list.forEach(element => tmp.unshift(element))
    return tmp;
  }
  getLastItems(quantity: number): void {
    this.loadIndicator.state = true;
    this.angularFire.database.list('/items', {
      query: {
        orderByChild: 'id',
        startAt: (+this.getMinId(this.NEWS) - (quantity)),
        endAt: (+this.getMinId(this.NEWS) - (1)),
      }
    }).subscribe(list => this.pushUniqueList(this.reverseList(list), this.NEWS))
    //subscribe(list => list.forEach(element => this.pushUniqueItem(element, this.NEWS)))

  }
  getMinId(array: any[]): number {
    let min = Math.min(
      array[array.length - 1].id,
      array[array.length - 2].id,
      array[array.length - 3].id, )
    return min

  }
  getMaxId(array: any[]): number {
    let max = Math.max(
      array[0].id,
      array[1].id,
      array[2].id, )
    return max
  }
  getData(): News[] {
    return this.NEWS
  }
  getDataById(id): any {
    for (var i = 0; i < this.NEWS.length; i++) {
      if (this.NEWS[i].id == id) {
        return this.NEWS[i];
      }
    }


    return -1; //this. getDataByIdObservable(id)
    //
  }
  getDataByIdObservable(id) {
    this.loadIndicator.state = true;
    return this.angularFire.database.list('/items', {
      query: {
        orderByChild: 'id',
        startAt: +id,
        endAt: +id,
      }
    })
  }
  addData(item: News): void {
    this.items.push(item);
  }
  getVideo(): News[] {
    return this.video

  }
  addVideoToArray(quantity: number): void {
    this.loadIndicator.state = true;
    let query = this.getQuery("video", (DataService.videoLimiToLast += quantity));
    this.angularFire.database.list('/items', query)
      .subscribe(list => this.pushUniqueList(this.reverseList(list), this.video));

  }
  addToCalendar(start: number, end: number) {
    this.loadIndicator.state = true;
    if (this.calendar) this.calendar = [];
    this.angularFire.database.list('/items', {
      query: {
        orderByChild: 'date',
        startAt: start,
        endAt: end,
      }
    })
      .subscribe(list => this.pushUniqueList(this.reverseList(list), this.calendar),
     
    );

  }
  getCalendar() {
    return this.calendar;
  }
  getOnlyNews(): News[] {
    return this.onlyNews;

  }
  addOnlyNewsToArray(quantity: number): void {
    this.loadIndicator.state = true;
    let query = this.getQuery("news", (DataService.onlyNewsLimiToLast += quantity));
    this.angularFire.database.list('/items', query)
      .subscribe(list => this.pushUniqueList(this.reverseList(list), this.onlyNews));
  }
  getBlogs(): News[] {
    return this.blogs;
  }
  addBlogsToArray(quantity: number): void {
    this.loadIndicator.state = true;
    let query = this.getQuery("blog", (DataService.blogsLimiToLast += quantity));
    this.angularFire.database.list('/items', query)
      .subscribe(list => this.pushUniqueList(this.reverseList(list), this.blogs));
  }
  addToLastWeeks(days) {
    let start : number = Date.now() -(days*86400000);
    let end = Date.now() + 86400000;
    if (this.lastweeks.length>0) return;
    this.angularFire.database.list('/items', {
      query: {
        orderByChild: 'date',
        startAt: start,
        endAt: end,
      }
    }).subscribe(list => this.pushUniqueList(this.reverseList(list), this.lastweeks),
     
    );

  }
   getLastWeeks() {
    return this.lastweeks;
  }



/*addScriptCounter(id) {
  let script = this.document.createElement('script');
    script.src =  `https://break-news.disqus.com/count-data.js?
                   2=http://195.138.78.131/newsApp/item/` + id;
                   script.async = true;
    script.type = 'text/javascript';
}
*/

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




}