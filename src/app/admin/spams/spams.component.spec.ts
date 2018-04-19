import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpamsComponent } from './spams.component';

describe('SpamsComponent', () => {
  let component: SpamsComponent;
  let fixture: ComponentFixture<SpamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
