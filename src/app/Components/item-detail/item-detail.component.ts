import { Component,  OnInit, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { News } from '../../_Shared/news';
import { DataService } from '../../_Services/data.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})


export class ItemDetailComponent implements OnInit, AfterViewInit {

  @Input() item: News;
  bodySanitized: SafeHtml;


  constructor(private domSanitizer: DomSanitizer) {
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.bodySanitized = this.domSanitizer.bypassSecurityTrustHtml(this.item.body);
      }
  ngOnDestroy() {
  }


}