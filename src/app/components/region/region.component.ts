import { ActivatedRoute } from "@angular/router";
import { MapService } from "src/app/services/map.service";
import { Component, OnInit } from "@angular/core";
import { RegionService } from "src/app/services/region.service";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-region",
  templateUrl: "./region.component.html",
  styleUrls: ["./region.component.scss"]
})
export class RegionComponent implements OnInit {
  region: any;
  regions: any[];
  superficie: any;
  evPM: any[] = [];
  evPMLayout: any;
  evPop: any;
  evPopLayout: any;
  isLoading = true;
  dataPM2000: any;
  pM2000Layout: any;
  dataPM2010: any;
  pM2010Layout: any;
  dataPM2018: any;
  pM2018Layout: any;

  btsExpresso: any[] = [];
  agencesExpresso: any[] = [];
  btsTigo: any[] = [];
  btsOrange: any[] = [];
  coverZone: any[] = [];
  departs: any[] = [];
  percCouv = 0;
  surfaceCouv = 0;
  depsData = {
    pop_2000: 0,
    pop_2010: 0,
    pop_2018: 0,
    pme_2000: 0,
    pme_2010: 0,
    pme_2018: 0,
    pmo_2000: 0,
    pmo_2010: 0,
    pmo_2018: 0,
    pmt_2000: 0,
    pmt_2010: 0,
    pmt_2018: 0
  };
  constructor(
    private regService: RegionService,
    private depService: DepartmentService,
    private mapService: MapService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const regName = this.route.snapshot.paramMap.get("nom");
    this.getRegionsData(regName);
    this.getDeps(regName);
    this.getCovers();
  }

  getRegionsData(regName) {
    this.region = this.regService.getRegion(regName);
    this.regions = this.regService.regions;
  }

  getDeps(regName) {
    this.departs = this.depService.depsByreg(regName);
    this.departs.map(dep => {
      const d = dep.properties;
      this.depsData.pop_2000 += d.pop_2000;
      this.depsData.pop_2010 += d.pop_2010;
      this.depsData.pop_2018 += d.pop_2018;

      this.depsData.pme_2000 += d.pme_2000;
      this.depsData.pme_2010 += d.pme_2010;
      this.depsData.pme_2018 += d.pme_2018;

      this.depsData.pmo_2000 += d.pmo_2000;
      this.depsData.pmo_2010 += d.pmo_2010;
      this.depsData.pmo_2018 += d.pmo_2018;

      this.depsData.pmt_2000 += d.pmt_2000;
      this.depsData.pmt_2010 += d.pmt_2010;
      this.depsData.pmt_2018 += d.pmt_2018;

      this.getMapData(d.id_dep);
    });
    this.initEvPopChart();
    this.isLoading = false;
    this.initEvPMChart();
    this.initPiePM();
  }

  getMapData(depId) {
    this.btsExpresso.push(...this.mapService.btsExpressoByDep(depId));
    this.agencesExpresso.push(...this.mapService.agencesExpByDep(depId));
    this.btsOrange.push(...this.mapService.btsOrangeByDep(depId));
    this.btsTigo.push(...this.mapService.btsTigoByDep(depId));
    this.coverZone.push(...this.mapService.coversByDep(depId));
  }

  getCovers() {
    this.superficie = Math.round(
      this.departs.map(d => d.properties.superficie).reduce((c, s) => c + s, 0)
    );
    this.coverZone.map(c => {
      this.surfaceCouv += Math.round(c.properties.surf_couv);
    });
    this.percCouv = Math.round((this.surfaceCouv * 100) / this.superficie);
  }

  initEvPopChart() {
    this.evPop = [
      {
        x: ["2000", "2010", "2018"],
        y: [
          this.depsData.pop_2000,
          this.depsData.pop_2010,
          this.depsData.pop_2018
        ],
        type: "scatter",
        name: `Population`,
        mode: "lines+markers",
        text: []
      }
    ];

    this.evPopLayout = {
      title: `Evolution de la population de la région de ${
        this.region.nom
      } de 2000 à 2018`,
      showlegend: false,
      xaxis: {
        title: "Année",
        showgrid: true
      },
      yaxis: {
        title: "Population"
        // showgrid: false
      }
    };
  }

  initEvPMChart() {
    const evExpresso = {
      x: ["2000", "2010", "2018"],
      y: [
        this.depsData.pme_2000,
        this.depsData.pme_2010,
        this.depsData.pme_2018
      ],
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
      y: [
        this.depsData.pmo_2000,
        this.depsData.pmo_2010,
        this.depsData.pmo_2018
      ],
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
      y: [
        this.depsData.pmt_2000,
        this.depsData.pmt_2010,
        this.depsData.pmt_2018
      ],
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
      showlegend: false,
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
    this.dataPM2000 = [
      {
        values: [
          this.depsData.pme_2000,
          this.depsData.pmo_2000,
          this.depsData.pmt_2000
        ],
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
        values: [
          this.depsData.pme_2010,
          this.depsData.pmo_2010,
          this.depsData.pmt_2010
        ],
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
        values: [
          this.depsData.pme_2018,
          this.depsData.pmo_2018,
          this.depsData.pmt_2018
        ],
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
