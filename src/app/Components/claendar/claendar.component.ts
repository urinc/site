import { Component, OnInit } from '@angular/core';
import { DataService } from './../../_Services/data.service';
import { News } from './../../_Shared/news';


@Component({
  selector: 'app-claendar',
  templateUrl: './claendar.component.html',
  styleUrls: ['./claendar.component.css']
})
export class ClaendarComponent {
  startAt: number;
  endAt: number;
  from: string = "From";
  to: string = "To "
  itemsList : News[];
classOfInitialPage = {mainSection :true};

  marker : boolean = false;
  marker1 : boolean = true;
  constructor(private dataService: DataService) {
 
  }

  onDateFromChanged(date) {
    this.startAt = date;
  }

  onDateToChanged(date) {
    this.endAt = date+86400000;   
  }

  getItems() {
    this.dataService.addToCalendar(this.startAt, this.endAt);
    this.itemsList   = this.dataService.getCalendar();
    this.marker =true;
  }

  



}
