import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from '../../_Shared/news';
import { DataService } from '../../_Services/data.service';

@Component({
  selector: 'app-full-item',
  templateUrl: './full-item.component.html',
  styleUrls: ['./full-item.component.css']
})

export class FullItemComponent implements OnInit {


  id;
  item: News;

  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService) {
  
  }


  ngOnInit() {
    console.log("full item init");
  this.id = this.activateRoute.snapshot.params['id'];
    if (this.dataService.getDataById(this.id) == -1) {
      if (!this.item) {
            this.dataService.getDataByIdObservable(this.id)
          .subscribe(item => this.item = item[0]);
      }
    }
     else 
       this.item=this.dataService.getDataById(this.id);


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
