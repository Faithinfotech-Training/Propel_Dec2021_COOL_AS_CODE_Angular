import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmedicineComponent } from './viewmedicine.component';

describe('ViewmedicineComponent', () => {
  let component: ViewmedicineComponent;
  let fixture: ComponentFixture<ViewmedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
