import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedabuseComponent } from './reportedabuse.component';

describe('ReportedabuseComponent', () => {
  let component: ReportedabuseComponent;
  let fixture: ComponentFixture<ReportedabuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedabuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedabuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
