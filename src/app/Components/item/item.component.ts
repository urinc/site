import { Component, ElementRef, ViewChild, OnInit, Renderer, Input, AfterViewInit } from '@angular/core';
import { News } from './../../_Shared/news';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//declare var DISQUSWIDGETS: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  @Input() item: News;
  @Input() classOfInitialPage;

  initialBody: string = '';
  intro: string = '';
  expandablePart: string = '';
  cleanedBody: string;
  splittedBody: string[];
  articleBody: string = "... ";
  visibility: boolean = true;
  top: boolean = false;
  comments = { count: 0 };
  url: string;



  constructor(
    private http: Http,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.url = "https://break-news.disqus.com/count-data.js?2=http://195.138.78.131/newsApp/item/" + this.item.id;
    this.initialBody = this.item.body;
    this.cleanedBody = this.sanitizeText(this.initialBody);
    this.splittedBody = this.cleanedBody.split(' ');
    this.getIntro();
    this.getArticleBody();
    //  this.disqWidgetCreate();
    //  this.addScriptCounter();
    // this.getHCount();
  }
  sanitizeText(body) {
    let regex = /(&nbsp;|&mdash;|&ndash;|<([^>]+)>)/ig;
    return body.replace(regex, '')
      .replace(/(&laquo;)/ig, '"')
      .replace(/(&raquo;)/ig, '"');
  }
  getIntro() {
    for (let i = 0; i < this.splittedBody.length; i++) {
      if (this.intro.length < 195) {
        this.intro = this.intro + this.splittedBody.shift() + ' ';
      }
      else return;
    }
  }
  getArticleBody() {
    for (let i = 0; i < this.splittedBody.length; i++) {
      this.articleBody = this.articleBody + this.splittedBody[i] + ' ';
    }

  }
  navigateTo() {
    this.router.navigate(['/item', this.item.id]);
  }

  approximateReading() {
    return Math.ceil(this.splittedBody.length / 150)
  }

  toggleVisibility() {
    this.visibility = !this.visibility;


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

  addScriptCounter() {
    let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = this.url;
    script.async = true;
    script.type = 'text/javascript';
  }

}

