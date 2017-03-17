import { Component, OnInit, Input } from '@angular/core';
import { News } from './../../_Shared/news';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 @Input () itemsList: News[];
 @Input () classOfInitialPage;
  
  constructor() { }

  ngOnInit() {
  }

}
