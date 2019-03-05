import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  dataPM: any;
  pMLayout: any;
  constructor() {}

  ngOnInit() {
    this.dataPM = [
      {
        values: [25.14, 51.15, 23.71],
        labels: ["Expresso", "Orange", "Tigo"],
        marker: {
          colors: ["rgb(133, 51, 255)", "rgb(255, 92, 51)", "rgb(0, 82, 204)"]
        },
        type: "pie"
      }
    ];

    this.pMLayout = {
      title: `Part de marché des compagnies téléphoniques en 2018`,
      height: 400,
      width: "100%"
    };
  }
}
