import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCommentedComponent } from './top-commented.component';

describe('TopCommentedComponent', () => {
  let component: TopCommentedComponent;
  let fixture: ComponentFixture<TopCommentedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCommentedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCommentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
