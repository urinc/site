import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../../_Services/data.service';
import { News } from '../../_Shared/news'


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})

export class AddArticleComponent implements OnInit {
  body: any;
  addNewArticle: FormGroup;
  constructor(private dataService: DataService,
    private formBuilder: FormBuilder) {
  }


  ngOnInit() {

      this.addNewArticle = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      avatar: ['', [Validators.required, Validators.minLength(4)]],
      articleType: ['', [Validators.required, Validators.minLength(4)]],
      author: ['', [Validators.required, Validators.minLength(4)]],
       videoURL: ['', [Validators.required, Validators.minLength(4)]],
    });
  }


  onSubmit({ value, valid }) {
    // console.log(value, valid);
  }


  preview({ value, valid }) {
    console.log(value, valid);
  }

  post() {
    console.log("title " + this.addNewArticle.value.title)
    console.log("avatar " + this.addNewArticle.value.avatar)
    console.log("type " + this.addNewArticle.value.articleType)
    console.log("body " + this.body)
     this.dataService.addData(this.itemBuilder());
  }

  keyupHandler($event) {
    this.body = $event;
  }

  itemBuilder() {
    //this.dataService.addData()

    let title: string = this.addNewArticle.value.title;
    let avatar: string = this.addNewArticle.value.avatar;
    let type: string  = this.addNewArticle.value.articleType;
    let author: string  = this.addNewArticle.value.author;
    let body: string = this.body;
     let id = +this.dataService.getMaxId(this.dataService.getData()) + 1;
    let videoURL: string  = this.addNewArticle.value.videoURL || "none";
    let item = new News(avatar, title , body, type, author, id , videoURL);
            return item;
  }


}


