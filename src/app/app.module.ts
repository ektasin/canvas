import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { LoadJsonComponent } from './load-json/load-json.component';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { GenerateJsonComponent } from './generate-json/generate-json.component';
import { PropertiesComponent } from './properties/properties.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExportToPNGComponent } from './export-to-png/export-to-png.component';
@NgModule({ 
    declarations: [
         AppComponent, 
         NewComponent, 
         LoadJsonComponent, 
         GenerateCodeComponent, 
         GenerateJsonComponent, 
         PropertiesComponent, 
         ExportToPNGComponent ], 
    imports:
     [ 
         RouterModule,
         CommonModule,
         BrowserModule,
         BrowserModule,
         BrowserAnimationsModule,
         AppRoutingModule,
         FormsModule,
         RouterModule.forRoot([])
      ], 
      providers: [], 
      bootstrap: [AppComponent]
})
export class AppModule { }
