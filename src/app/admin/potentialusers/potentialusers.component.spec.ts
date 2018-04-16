import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialusersComponent } from './potentialusers.component';

describe('PotentialusersComponent', () => {
  let component: PotentialusersComponent;
  let fixture: ComponentFixture<PotentialusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
