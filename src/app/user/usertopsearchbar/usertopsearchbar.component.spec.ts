import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertopsearchbarComponent } from './usertopsearchbar.component';

describe('UsertopsearchbarComponent', () => {
  let component: UsertopsearchbarComponent;
  let fixture: ComponentFixture<UsertopsearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertopsearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertopsearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
