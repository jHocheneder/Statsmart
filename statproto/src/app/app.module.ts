import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';
import { ChartComponent } from './chart/chart.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatenComponent } from './components/daten/daten.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomizeComponent } from './components/customize/customize.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'daten', component: DatenComponent},
  {path: 'customize', component: CustomizeComponent},
  {path: 'chart', component: ChartComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DatenComponent,
    HomeComponent,
    ProfilComponent,
    CustomizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
