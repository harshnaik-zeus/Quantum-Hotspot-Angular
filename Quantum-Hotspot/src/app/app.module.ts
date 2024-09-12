import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionInfoComponent } from './question-info/question-info.component';
import { QuestionPropertiesComponent } from './question-properties/question-properties.component';
import { QuestionMainComponent } from './question-main/question-main.component';
import { ImageCanvasComponent } from './question-main/image-canvas/image-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CreateQuestionComponent,
    QuestionInfoComponent,
    QuestionPropertiesComponent,
    QuestionMainComponent,
    ImageCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
