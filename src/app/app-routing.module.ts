import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Features/main/main.component';
import { HistoricalDataComponent } from './Features/historical-data/historical-data.component';
import { AppComponent } from './app.component';

const routes: Routes = [
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
