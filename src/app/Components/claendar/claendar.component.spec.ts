import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaendarComponent } from './claendar.component';

describe('ClaendarComponent', () => {
  let component: ClaendarComponent;
  let fixture: ComponentFixture<ClaendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
