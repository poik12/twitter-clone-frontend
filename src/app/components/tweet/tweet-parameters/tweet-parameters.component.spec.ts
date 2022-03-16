import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetParametersComponent } from './tweet-parameters.component';

describe('TweetParametersComponent', () => {
  let component: TweetParametersComponent;
  let fixture: ComponentFixture<TweetParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TweetParametersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
