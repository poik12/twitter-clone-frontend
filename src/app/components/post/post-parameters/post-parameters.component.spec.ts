import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostParametersComponent } from './post-parameters.component';

describe('PostParametersComponent', () => {
  let component: PostParametersComponent;
  let fixture: ComponentFixture<PostParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
