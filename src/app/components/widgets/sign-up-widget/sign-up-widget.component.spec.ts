import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWidgetComponent } from './sign-up-widget.component';

describe('SignUpWidgetComponent', () => {
  let component: SignUpWidgetComponent;
  let fixture: ComponentFixture<SignUpWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
