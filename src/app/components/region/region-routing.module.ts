import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegionComponent } from "./region.component";

const routes: Routes = [
  {
    path: "",
    component: RegionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule {
  static components = [RegionComponent];
}
