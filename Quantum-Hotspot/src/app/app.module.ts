import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionInfoComponent } from './question-info/question-info.component';
import { QuestionPropertiesComponent } from './question-properties/question-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CreateQuestionComponent,
    QuestionInfoComponent,
    QuestionPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
