import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatCardModule, MatSelectModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MovieComponent } from './movie/movie.component';
import { MovieService } from './movie.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MovieComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatCardModule, MatSelectModule
  ],
  exports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatCardModule, MatSelectModule
  ],
  providers: [ MovieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
