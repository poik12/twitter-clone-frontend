import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesWidgetComponent } from './images-widget.component';

describe('ImagesWidgetComponent', () => {
  let component: ImagesWidgetComponent;
  let fixture: ComponentFixture<ImagesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
