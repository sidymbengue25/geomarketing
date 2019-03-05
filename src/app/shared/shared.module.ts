import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from "../components/map/map.component";
import { ChartComponent } from "../components/chart/chart.component";
import { MatButtonModule } from "@angular/material/button";
import { LoadingSpinnerComponent } from "../components/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [LoadingSpinnerComponent, MapComponent, ChartComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MapComponent,
    LoadingSpinnerComponent,
    ChartComponent
  ]
})
export class SharedModule {}
