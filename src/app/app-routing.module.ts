import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: "./components/home/home.module#HomeModule"
  },
  {
    path: "regions/:nom/departments/:id",
    loadChildren: "./components/department/department.module#DepartmentModule"
  },
  {
    path: "regions/:nom",
    loadChildren: "./components/region/region.module#RegionModule"
  },
  {
    path: "**",
    loadChildren: "./components/home/home.module#HomeModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
