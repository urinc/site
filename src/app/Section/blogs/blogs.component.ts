import { Component, ElementRef, OnInit, Renderer} from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
let div = this.renderer.createElement(this.el.nativeElement, 'div');
let scr = this.renderer.createElement(this.el.nativeElement, 'script');
let p = this.renderer.createElement(div, 'p');
let h1 = this.renderer.createElement(this.el.nativeElement, 'h1');




p.textContent = "hello";
this.renderer.setElementClass(p, "my-class", true);


//console.log(this.el.nativeElement.parentNode);
console.log(this.el.nativeElement);
console.log(this.el)


  }

}
