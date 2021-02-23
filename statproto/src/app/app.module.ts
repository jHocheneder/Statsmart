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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatlistComponent } from './components/statlist/statlist.component';
import { ArticleComponent } from './components/article/article.component';
import { DataDetailComponent } from './components/data-detail/data-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'daten', component: DatenComponent},
  {path: 'customize', component: CustomizeComponent},
  {path: 'chart', component: ChartComponent},
  {path: 'list', component: StatlistComponent},
  {path: 'article', component: ArticleComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DatenComponent,
    HomeComponent,
    ProfilComponent,
    CustomizeComponent,
    LoginComponent,
    RegisterComponent,
    StatlistComponent,
    ArticleComponent,
    DataDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ChartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
