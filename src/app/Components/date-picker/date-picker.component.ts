import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent   {

   @Input() direction;
    @Output() onDateChanged = new EventEmitter<number>();
 public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened: boolean = false;
 
  public constructor() {
    this.disableTomorrow();
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }
 
  public getDate(): number {
    let foo = this.dt && this.dt.getTime() || new Date().getTime();
    //console.log(foo);
    this.onDateChanged.emit(foo);
    return foo;
    
  }
 
  public today(): void {
    this.dt = new Date();
  }
 
  public d20090824(): void {
    this.dt = moment('2009-08-24', 'YYYY-MM-DD')
      .toDate();
  }
 
  public disableTomorrow(): void {
    this.dateDisabled = [{date: this.tomorrow, mode: 'day'}];
  }
 
  // todo: implement custom class cases
  public getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
 
      for (let event of this.events) {
        let currentDay = new Date(event.date).setHours(0, 0, 0, 0);
 
        if (dayToCheck === currentDay) {
          return event.status;
        }
      }
    }
 
    return '';
  }
 
  public disabled(date: Date, mode: string): boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }
 
  public open(): void {
    this.opened = !this.opened;
  }
 
  public clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }
 
  public toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }
}
