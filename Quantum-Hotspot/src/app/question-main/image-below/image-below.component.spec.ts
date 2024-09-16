import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBelowComponent } from './image-below.component';

describe('ImageBelowComponent', () => {
  let component: ImageBelowComponent;
  let fixture: ComponentFixture<ImageBelowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageBelowComponent]
    });
    fixture = TestBed.createComponent(ImageBelowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
