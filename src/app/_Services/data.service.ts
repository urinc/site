import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Http, Jsonp, URLSearchParams } from '@angular/http';

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
  topComments: News[] = [];
  commentsCounter = [];
  loadIndicator = { state: false };



  constructor(private angularFire: AngularFire,
    private jsonp: Jsonp) {
    this.getInitialLastItems(5);
    this.items = angularFire.database.list('/items');
    this.addVideoToArray(6);
    this.addTopComments(7, 10);

    setInterval(() => {
      //  console.log(this.topComments);
    }, 5000);

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
  unshiftUniqueItem(item : News, array : any[]): void {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) { return }
    }
    array.unshift(item);
     if (this.loadIndicator.state)
      this.loadIndicator.state = false;
  }
  pushUniqueItem(item, array: any[]): void {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) { return }
    }
    array.push(item);
    //  if (!this.commentsCounter[item.id])
    //  this.getCommentCount(item);
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
  addToCalendar(start: number, end: number): void {
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
  getCalendar() : News []{
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
  addTopComments(days :number, itemsQuantity:number):void {
    let start: number = Date.now() - (days * 86400000);
    let end = Date.now() + 86400000;
    if (this.topComments.length > 0) return;
    this.angularFire.database.list('/items', {
      query: {
        orderByChild: 'date',
        startAt: start,
        endAt: end,
      }
    }).subscribe(list => list.forEach(item => this.getCommentCount(item, itemsQuantity))
      //this.pushUniqueList(this.reverseList(list), this.topComments),

      );

  }
  getTopComments() : News[]{
    return this.topComments;
  }
  getCommentCount(item: News, itemsQuantity:number): void {
    let id = item.id;
    let url = "https://disqus.com/api/3.0/threads/list.json";
    let params = new URLSearchParams();
    params.set('api_key', 'tgsDgxjpDUDzoJsmxs9PQdJhUutzOq06tUNeghuI0ONdCxW6vXCCMN8eXZyWhReF');
    params.set('forum', 'break-news');
    params.set('thread:ident', "item/" + id);
    params.set('callback', 'JSONP_CALLBACK');
    this.jsonp
      .get(url, { search: params })
      .subscribe(data => {
        let count = data.json().response[0].posts;
        item.comments = count;
        this.topComments.push(item);
        this.sortTopComment(itemsQuantity);
      }
      , error => console.error(error))
  }
  sortTopComment(itemsQuantity: number): void {
    let tc = this.topComments;
    tc = tc.sort((a, b) => b.comments - a.comments);
    if (tc.length >= itemsQuantity)
      this.topComments = this.topComments.slice(0, itemsQuantity);
  }
  addCommentsCounter(comment): void {
    let id = comment.id.replace("item/", "");
    let counter = comment.comments;
    this.commentsCounter[id] = counter;

  }
}