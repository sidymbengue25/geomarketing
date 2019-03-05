import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegionRoutingModule } from "./region-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [RegionRoutingModule.components],
  imports: [CommonModule, RegionRoutingModule, SharedModule]
})
export class RegionModule {}
