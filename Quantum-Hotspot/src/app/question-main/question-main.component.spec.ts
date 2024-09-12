import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMainComponent } from './question-main.component';

describe('QuestionMainComponent', () => {
  let component: QuestionMainComponent;
  let fixture: ComponentFixture<QuestionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionMainComponent]
    });
    fixture = TestBed.createComponent(QuestionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
