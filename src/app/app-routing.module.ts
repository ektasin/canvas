import { ExportToPNGComponent } from './export-to-png/export-to-png.component';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { GenerateJsonComponent } from './generate-json/generate-json.component';
import { LoadJsonComponent } from './load-json/load-json.component';
import { NgModule, Component } from '@angular/core';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {path:'new',component:NewComponent},
  {path:'generate-code',component:GenerateCodeComponent},
  {path:'load-json',component:LoadJsonComponent},
  {path:'generate-json',component:GenerateJsonComponent},
  {path:'properties',component:PropertiesComponent},
  {path:'export-to-png',component:ExportToPNGComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
