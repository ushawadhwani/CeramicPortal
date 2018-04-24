import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionlistComponent } from './exhibitionlist.component';

describe('ExhibitionlistComponent', () => {
  let component: ExhibitionlistComponent;
  let fixture: ComponentFixture<ExhibitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
