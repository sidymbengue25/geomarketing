import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { RegionService } from "src/app/services/region.service";
import * as M from "materialize-css/dist/js/materialize.min";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  regions: string[];
  @ViewChild("dropd") dropd: ElementRef;

  constructor(private regService: RegionService) {}

  ngOnInit() {
    this.regions = this.regService.regions;
  }
  ngAfterViewInit() {
    M.Dropdown.init(this.dropd.nativeElement, {
      constrainWidth: false,
      hover: true,
      outDuration: 320
    });
  }
}
