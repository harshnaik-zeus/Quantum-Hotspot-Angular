import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPropertiesComponent } from './question-properties.component';

describe('QuestionPropertiesComponent', () => {
  let component: QuestionPropertiesComponent;
  let fixture: ComponentFixture<QuestionPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionPropertiesComponent]
    });
    fixture = TestBed.createComponent(QuestionPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
