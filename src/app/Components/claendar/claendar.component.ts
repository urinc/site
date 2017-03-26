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
  itemsList: News[];
  classOfInitialPage = { mainSection: true };
  loadIndicator;
  wrongDate: boolean = false;


  constructor(private dataService: DataService) {

    this.loadIndicator = dataService.loadIndicator;
  }
  onDateFromChanged(date) {
    this.startAt = date;
  }
  onDateToChanged(date) {
    this.endAt = date + 86400000;
  }
  getItems() {
    if ((this.endAt - this.startAt) < 0) {
      this.wrongDate = true;
      return;
    }
    this.wrongDate = false;
    this.dataService.addToCalendar(this.startAt, this.endAt);
    this.itemsList = this.dataService.getCalendar();

  }





}
