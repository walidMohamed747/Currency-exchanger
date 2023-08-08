import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Core/components/nav/nav-bar/nav-bar.component';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { MainComponent } from './Features/main/main.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HistoricalDataComponent } from './Features/historical-data/historical-data.component'



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LayoutComponent,
    MainComponent,
    HistoricalDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
