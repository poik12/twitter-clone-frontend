import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularWidgetComponent } from './most-popular-widget.component';

describe('MostPopularWidgetComponent', () => {
  let component: MostPopularWidgetComponent;
  let fixture: ComponentFixture<MostPopularWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
