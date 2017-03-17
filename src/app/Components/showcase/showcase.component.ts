import { Component, OnInit, Input,  } from '@angular/core';
import { News } from './../../_Shared/news';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})


export class ShowcaseComponent implements OnInit{
  @Input() videoList: News[];


  constructor(private router: Router) { }

  ngOnInit() {
  
  }


  navigateTo(id) {
    this.router.navigate(['/item', id]);
    console.log("navogate")
  }



}


