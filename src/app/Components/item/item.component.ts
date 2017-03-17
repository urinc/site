import { Component, OnInit, Input } from '@angular/core';
import { News } from './../../_Shared/news';
import { Router } from '@angular/router';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: News;

  @Input() classOfInitialPage;

  constructor(private router: Router) { }

  initialBody: string = ''; 
  intro: string = '';
  expandablePart : string = '';
  cleanedBody: string ;
  splittedBody : string[];


  ngOnInit() {
     this.initialBody = this.item.body;
     this.cleanedBody = this.sanitizeText(this.initialBody);
     this.splittedBody = this.cleanedBody.split(' ');

     this.getIntro()
  }


sanitizeText(body){
    let regex =/(&nbsp;|&mdash;|&ndash;|<([^>]+)>)/ig;
    return body.replace(regex, '')
    .replace(/(&laquo;)/, '"')
    .replace(/(&raquo;)/, ''); 
}


 getIntro(){
   for (let i = 0; i < this.splittedBody.length ; i++){
     if (this.intro.length < 195) {
       this.intro = this.intro + this.splittedBody[i] + ' ';
      }
      else    return ;
   }
 }


  navigateTo() {
    this.router.navigate(['/item', this.item.id]);
  }

   approximateReading() {
    return Math.ceil(this.splittedBody.length / 150)
  }

}
