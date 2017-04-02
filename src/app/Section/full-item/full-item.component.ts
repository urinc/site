import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from '../../_Shared/news';
import { DataService } from '../../_Services/data.service';

@Component({
  selector: 'app-full-item',
  templateUrl: './full-item.component.html',
  styleUrls: ['./full-item.component.css']
})

export class FullItemComponent implements OnInit, AfterViewInit {


  id;
  item: News;

  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService) {

    this.id = this.activateRoute.snapshot.params['id'];
  }


  ngOnInit() {

    if (this.dataService.getDataById(this.id) == -1) {
      if (!this.item) {
        this.dataService.getDataByIdObservable(this.id)
          .subscribe(item => this.item = item[0]);
      }
    }
    else
      this.item = this.dataService.getDataById(this.id);


  }

  ngAfterViewInit() {
    window.scrollTo(0, 0)
  }



  isEqual(element) {
    if (element.id == this.item.id) {
      console.log("found id " + element.id);
      return true;
    }
    else {
      console.log("nothing found in NEWS")
      return false
    };
  }
}
