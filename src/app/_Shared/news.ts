export class News {

  static counter = 0;
  id: number;
  date: number;
  viewable: boolean;
  images; tags: string[];
  videoURL; source; avatar; title; body; author; category: string;


  constructor(avatar: string,
               title: string,
                body: string,
             category: string,
               author: string,
               id : number,
               videoURL: string ) {
    this.category = category ;
    this.avatar = avatar;
    this.title = title;
    this.body = body;
    this.date =  Date.now();
    this.author = author;
    this.viewable= true;
    this.videoURL = videoURL ||"none"; 
    this.id = id;

  }


}