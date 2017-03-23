import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from  '@angular/router';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { AngularFireModule } from 'angularfire2'
import { firebaseConfig } from '../environments/firebase.config'
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { DisqusModule } from "ng2-awesome-disqus";

import { AppComponent } from './app.component';
import { DataService } from './_Services/data.service';
import { MainComponent } from './Section/main/main.component';
import { NewsComponent } from './Section/news/news.component';
import { ListComponent } from './Components/list/list.component';
import { ItemComponent } from './Components/item/item.component';
import { ItemDetailComponent } from './Components/item-detail/item-detail.component';
import { HeaderComponent } from './Components/header/header.component';
import { AddArticleComponent } from './Components/add-article/add-article.component';
import { TinyEditorComponent } from './Components/editor/editor.component';
import { FullItemComponent } from './Section/full-item/full-item.component';
import { VideoComponent } from './Section/video/video.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { BlogsComponent } from './section/blogs/blogs.component';
import { CommentsComponent } from './components/comments/comments.component';


const appRoutes: Routes =[
    { path: '', component: MainComponent},
    { path: 'item/:id', component: FullItemComponent},
    { path: 'add', component: AddArticleComponent},
    { path: 'video', component: VideoComponent},
    { path: 'blogs', component: BlogsComponent},
    { path: '*', component: MainComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    ListComponent,
    ItemComponent,
    ItemDetailComponent,
    HeaderComponent,
    AddArticleComponent,
    TinyEditorComponent,
    FullItemComponent,
    VideoComponent,
    ShowcaseComponent,
    BlogsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    InfiniteScrollModule,
    CarouselModule.forRoot(),
    DisqusModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
