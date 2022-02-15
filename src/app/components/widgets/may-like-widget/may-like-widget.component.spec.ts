import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayLikeWidgetComponent } from './may-like-widget.component';

describe('MayLikeWidgetComponent', () => {
  let component: MayLikeWidgetComponent;
  let fixture: ComponentFixture<MayLikeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayLikeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayLikeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
