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
  articleBody : string= "... ";
  visibility : boolean =  true;
  top : boolean = false;
  
    
marker = "none"
  ngOnInit() {
     this.initialBody = this.item.body;
     this.cleanedBody = this.sanitizeText(this.initialBody);
     this.splittedBody = this.cleanedBody.split(' ');
     this.getIntro();
     this.getArticleBody();     
  }


sanitizeText(body){
    let regex =/(&nbsp;|&mdash;|&ndash;|<([^>]+)>)/ig;
    return body.replace(regex, '')
    .replace(/(&laquo;)/ig, '"')
    .replace(/(&raquo;)/ig, '"'); 
}


 getIntro(){
   for (let i = 0; i < this.splittedBody.length ; i++){
     if (this.intro.length < 195) {
       this.intro = this.intro + this.splittedBody.shift() + ' ';
      }
      else    return ;
   }
 }
 
 getArticleBody(){
    for (let i = 0; i < this.splittedBody.length ; i++){
      this.articleBody = this.articleBody + this.splittedBody[i] + ' ';
    }

 }



  navigateTo() {
    this.router.navigate(['/item', this.item.id]);
  }

   approximateReading() {
    return Math.ceil(this.splittedBody.length / 150)
  }

  
  
  toggleVisibility(){
    this.visibility=!this.visibility;

 
  }

}
