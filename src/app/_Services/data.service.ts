import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'

import { News } from '../_Shared/news'

@Injectable()
export class DataService {
  item: News;
  items: FirebaseListObservable<any>;

  static videoLimiToLast = 0;
  static articlesLimiToLast = 0;
  static blogsLimiToLast = 0;
  NEWS: News[] = [];
  video: News[] = [];
  calendar: News[] = [];
  blogs: News[] = [];
  loadIndicator = { state: false };

  constructor(private angularFire: AngularFire) {

    this.getInitialLastItems(5);
    this.items = angularFire.database.list('/items');
    this.addVideoToArray(6);
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
    let query = this.getQuery("video", (DataService.videoLimiToLast = DataService.videoLimiToLast + quantity));
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
      //  e => console.log('onError: %s', e),
      // () => console.log('onCompleted')
    );

  }

  getCalendar() {
    return this.calendar;
  }
}