import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { News } from './../../_Shared/news';
import { DataService } from './../../_Services/data.service';

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
  url: string;
  comments: number[];
 visibility2: boolean = true;


  constructor(
    private dataService: DataService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer
  ) {


  }

  ngOnInit() {
    this.initialBody = this.item.body;
    this.cleanedBody = this.sanitizeText(this.initialBody);
    this.splittedBody = this.cleanedBody.split(' ');
    this.getIntro();
    this.getArticleBody();
    this.comments = this.dataService.commentsCounter//[this.item.id] || 0;
   
    this.disqWidgetCreate();
    this.addScriptCounter();
   
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
          self.dataService.addCommentsCounter(response.counts[0]);
          //console.log(response.counts[0]);
        }
      }
    }
 }
  addScriptCounter() {
    let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = `https://break-news.disqus.com/count-data.js?1=item/` + this.item.id;
    script.async = true;
    script.type = 'text/javascript';
  }













}

