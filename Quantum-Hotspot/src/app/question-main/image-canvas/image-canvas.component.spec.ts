import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCanvasComponent } from './image-canvas.component';

describe('ImageCanvasComponent', () => {
  let component: ImageCanvasComponent;
  let fixture: ComponentFixture<ImageCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCanvasComponent]
    });
    fixture = TestBed.createComponent(ImageCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


