import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DepartmentService } from "./../../services/department.service";
import { RegionService } from "./../../services/region.service";
import { MapService } from "src/app/services/map.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"]
})
export class DepartmentComponent implements OnInit {
  department: any;
  isLoading = true;
  regionDeps: any[];
  evPM: any[] = [];
  evPMLayout: any;
  evPop: any;
  evPopLayout: any;
  dataPM2000: any;
  pM2000Layout: any;
  dataPM2010: any;
  pM2010Layout: any;
  dataPM2018: any;
  pM2018Layout: any;

  btsExpresso: any[];
  agencesExpresso: any[];
  btsTigo: any[];
  btsOrange: any[];
  coverZone: any[];
  departs: any[];
  depId: number;

  constructor(
    private route: ActivatedRoute,
    private depService: DepartmentService,
    private regService: RegionService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.depId = +params.get("id");
      this.getMapData();
      this.getDep();
    });
  }

  getDep() {
    this.department = this.depService.dep(this.depId);
    this.departs = [this.department];
    this.regionDeps = this.regService.getRegion(
      this.department.properties.Region
    );
    this.isLoading = false;
    this.initEvPopChart();
    this.initEvPMChart();
    this.initPiePM();
  }

  getMapData() {
    this.btsExpresso = this.mapService.btsExpressoByDep(this.depId);
    this.agencesExpresso = this.mapService.agencesExpByDep(this.depId);
    this.btsOrange = this.mapService.btsOrangeByDep(this.depId);
    this.btsTigo = this.mapService.btsTigoByDep(this.depId);
    this.coverZone = this.mapService.coversByDep(this.depId);
  }

  initEvPopChart() {
    const depData = this.department.properties;
    this.evPop = [
      {
        x: ["2000", "2010", "2018"],
        y: [depData.pop_2000, depData.pop_2010, depData.pop_2018],
        type: "scatter",
        name: `Population`,
        mode: "lines+markers",
        text: []
      }
    ];

    this.evPopLayout = {
      title: `Evolution de la population de ${
        depData.Department
      } de 2000 à 2018`,
      showlegend: true,
      xaxis: {
        title: "Année"
        // showgrid: false
      },
      yaxis: {
        title: "Population"
        // showgrid: false
      }
    };
  }

  initEvPMChart() {
    const depData = this.department.properties;
    const evExpresso = {
      x: ["2000", "2010", "2018"],
      y: [depData.pme_2000, depData.pme_2010, depData.pme_2018],
      line: {
        color: "rgb(133, 51, 255)"
      },
      text: ["PM Expresso", "PM Expresso", "PM Expresso"],
      type: "scatter",
      name: `Part de marché de Expresso`,
      mode: "lines+markers"
    };
    const evOrange = {
      x: ["2000", "2010", "2018"],
      y: [depData.pmo_2000, depData.pmo_2010, depData.pmo_2018],
      line: {
        color: "rgb(255, 92, 51)"
      },
      text: ["PM Orange", "PM Orange", "PM Orange"],
      type: "scatter",
      name: `Part de marché de Orange`,
      mode: "lines+markers"
    };

    const evTigo = {
      x: ["2000", "2010", "2018"],
      y: [depData.pmt_2000, depData.pmt_2010, depData.pmt_2018],
      line: {
        color: "rgb(0, 82, 204)"
      },
      text: ["PM Tigo", "PM Tigo", "PM Tigo"],
      type: "scatter",
      name: `Part de marché de Tigo`,
      mode: "lines+markers"
    };

    this.evPMLayout = {
      title: `Evolution des part de marché de 2000 à 2018`,
      showlegend: true,
      xaxis: {
        title: "Année"
        // showgrid: false
      },
      yaxis: {
        title: "Part de marché (%)"
        // showgrid: false
      }
    };
    this.evPM = [evExpresso, evOrange, evTigo];
  }

  initPiePM() {
    const depData = this.department.properties;
    this.dataPM2000 = [
      {
        values: [depData.pme_2000, depData.pmo_2000, depData.pmt_2000],
        labels: ["Expresso", "Orange", "Tigo"],
        marker: {
          colors: ["rgb(133, 51, 255)", "rgb(255, 92, 51)", "rgb(0, 82, 204)"]
        },
        type: "pie"
      }
    ];

    this.pM2000Layout = {
      title: `Part de marché en 2000`,
      height: 400,
      width: 500
    };

    this.dataPM2010 = [
      {
        values: [depData.pme_2010, depData.pmo_2010, depData.pmt_2010],
        labels: ["Expresso", "Orange", "Tigo"],
        marker: {
          colors: ["rgb(133, 51, 255)", "rgb(255, 92, 51)", "rgb(0, 82, 204)"]
        },
        type: "pie"
      }
    ];

    this.pM2010Layout = {
      title: `Part de marché en 2010`,
      height: 400,
      width: 500
    };

    this.dataPM2018 = [
      {
        values: [depData.pme_2018, depData.pmo_2018, depData.pmt_2018],
        labels: ["Expresso", "Orange", "Tigo"],
        marker: {
          colors: ["rgb(133, 51, 255)", "rgb(255, 92, 51)", "rgb(0, 82, 204)"]
        },
        type: "pie"
      }
    ];

    this.pM2018Layout = {
      title: `Part de marché en 2018`,
      height: 400,
      width: 500
    };
  }
}
