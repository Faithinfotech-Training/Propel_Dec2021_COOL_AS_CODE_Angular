import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlabtestComponent } from './viewlabtest.component';

describe('ViewlabtestComponent', () => {
  let component: ViewlabtestComponent;
  let fixture: ComponentFixture<ViewlabtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlabtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
