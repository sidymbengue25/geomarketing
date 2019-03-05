import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DepartmentRoutingModule } from "./department-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [DepartmentRoutingModule.components],
  imports: [CommonModule, DepartmentRoutingModule, SharedModule]
})
export class DepartmentModule {}
