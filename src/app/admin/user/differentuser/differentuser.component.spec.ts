import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentuserComponent } from './differentuser.component';

describe('DifferentuserComponent', () => {
  let component: DifferentuserComponent;
  let fixture: ComponentFixture<DifferentuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferentuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
