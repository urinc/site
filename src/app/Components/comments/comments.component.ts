import { Component, Input, ElementRef, OnInit, Renderer } from '@angular/core';

@Component({
  selector: 'disqus-comp',
  template: '<div id="disqus_thread"></div>',
})

export class CommentsComponent implements OnInit {

  @Input() public identifier: string;
  dom: any;
  
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.dom = el.nativeElement;
  }
  ngOnInit() {
        if ((<any>window).DISQUS === undefined) {
      this.addScriptTag();
    }
    else {
      this.reset();
    }




  }
  reset() {
    console.log("comments reset()");
    (<any>window).DISQUS.reset({
      reload: true,
      config: this.getConfig(),
    });
  }
  addScriptTag() {
    (<any>window).disqus_config = this.getConfig();
    
    console.log((<any>window).disqus_config);
    let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = 'https://break-news.disqus.com/embed.js';
    script.async = true;
    script.type = 'text/javascript';
    script.setAttribute('data-timestamp', new Date().getTime().toString());
  }
  getConfig() {
   let identifier = this.identifier;
     return function () {
      this.page.title =  "news-item/"+ identifier;
      this.page.identifier =  "http://195.138.78.131/newsApp/#/item/"+ identifier;
      this.page.url = "http://195.138.78.131/newsApp/#/item/"+ identifier//window.location.href;
      this.language = 'en';
     // debugger;
    };
  }

 


}

