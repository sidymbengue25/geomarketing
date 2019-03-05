import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input
} from "@angular/core";
import { MapGenerator } from "src/app/shared/libs/map.generator";
import { MapService } from "src/app/services/map.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements AfterViewInit {
  @ViewChild("map") mapDiv: ElementRef;
  private map: any;
  mapLib: MapGenerator;
  centerView: number[];
  btsExpressoLayer: any;
  agencesExpLayer: any;
  coversLayer: any;
  btsTigoLayer: any;
  btsOrangeLayer: any;
  depsLayer: any;
  searchCtrl: any;
  customOptions = {
    bottom: "20px",
    className: "myCustomPopupPlacement"
  };
  @Input() btsExpresso: any[] = this.mapService.btsExpresso;
  @Input() agencesExpresso: any[] = this.mapService.agencesExpresso;
  @Input() btsTigo: any[] = this.mapService.btsTigo;
  @Input() btsOrange: any[] = this.mapService.btsOrange;
  @Input() covers: any[] = this.mapService.covers;
  @Input() departs: any[] = this.mapService.deps;
  baseMaps: any;
  @Input() addTheLegend = false;
  constructor(private mapService: MapService, private router: Router) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.mapLib = new MapGenerator();
    this.mapLib.init(this.mapDiv.nativeElement, this.centerView);
    this.map = this.mapLib.createMap();
    this.searchCtrl = this.mapLib.addFuseSearch;
    this.mapLib.changeDefaultIconPath("../../../assets/images/");
    this.addBasemaps();
    this.createBTSExpressoLayer();
    this.createAgenceExpressoLayer();
    this.createBTSTigoLayer();
    this.createBTSOrangeLayer();
    this.mapLib.addGeolocation();
    //  this.addLegend();
    this.createCovers();
    this.createDepsLayer();
    this.addControl(
      this.map,
      this.baseMaps,
      this.btsExpressoLayer,
      this.agencesExpLayer,
      this.btsOrangeLayer,
      this.btsTigoLayer,
      this.depsLayer,
      this.coversLayer
    );
    this.mapLib.addMeasurementControl();
  }

  addBasemaps() {
    this.mapLib.addAttribution(
      "<a href='https://github.com/sidymbengue25' target='_blank'>@sidymbengue</a>"
    );
    this.mapLib.addAttribution(
      "&copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors"
    );
    const googleStreets = this.mapLib.createABasmapeLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      true
    );
    const googleHybrid = this.mapLib.createABasmapeLayer(
      "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      false
    );
    const OpenStreetMap = this.mapLib.createOSMBasemap();
    this.baseMaps = {
      // tslint:disable-next-line:max-line-length
      "<div class='layers-control-img'><img src='../../../assets/images/basemaps/googleStreetimage.png'></div>Google Streets": googleStreets,
      // tslint:disable-next-line:max-line-length
      "<div class='layers-control-img'><img src='../../../assets/images/basemaps/googleHybrid.png'></div> Google Hybrid": googleHybrid,
      "<div class='layers-control-img'><img src='../../../assets/images/basemaps/osm.png'></div> OpenStreetMap": OpenStreetMap
    };
    // this.mapLib.addBasemapControlLayer(this.baseMaps);
  }

  createLayer(data, icon, iconSize, popup) {
    // this.configureSearchControl(data);
    const geoJSONData = {
      type: "FeatureCollection",
      features: data
    };
    return this.mapLib.addPointGeoJSONLayer(geoJSONData, icon, iconSize, popup);
  }

  createDepsLayer() {
    const geoJsonData = {
      type: "FeatureCollection",
      features: this.departs
    };
    this.depsLayer = this.mapLib.createPolygonLayer(
      geoJsonData,
      this.depsPopupCreator,
      this.depsStyler
    );

    this.configureSearchControl(this.departs, ["Department", "Region"]);
    this.map.addLayer(this.depsLayer).fitBounds(this.depsLayer.getBounds());
  }

  depsPopupCreator = (feature, layer) => {
    feature.layer = layer;
    const popupContent = `
    <div class='customPopup'>
      <div class='user_info'>
        <strong>Département : </strong>
        <h6>${feature.properties.Department}</h6>
      </div>
      <div class='user_info'>
        <strong>Région : </strong>
        <h6>${feature.properties.Region}</h6>
      </div>
      <div class='user_info'>
        <strong>Superficie: : </strong>
        <h6>${Math.ceil(feature.properties.superficie)} km²</h6>
      </div>
      <div class='user_info'>
        <strong>Population 2018: : </strong>
        <h6>${feature.properties.pop_2018}</h6>
      </div>
        <a href='/regions/${feature.properties.Region}/departments/${
      feature.properties.id_dep
    }'>Plus d'infos</a>
    </div>`;
    layer.on({
      mouseover: this.mapLib.highlightFeature,
      mouseout: e => {
        this.depsLayer.resetStyle(e.target);
      },
      click: layer.bindPopup(popupContent, this.customOptions)
    });
    // tslint:disable-next-line:semicolon
  };

  depsStyler(feature) {
    return {
      fillColor: "none",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.9
    };
  }

  createBTSExpressoLayer() {
    const icon = "../../../assets/images/bts/iconeExpresso.gif";
    this.btsExpressoLayer = this.createLayer(
      this.btsExpresso,
      icon,
      [32, 35],
      this.btsExpressoLayerPopup
    );

    this.configureSearchControl(this.btsExpresso, [
      "Department",
      "Region",
      "Commune"
    ]);
    this.map.addLayer(this.btsExpressoLayer);
  }

  btsExpressoLayerPopup(feature, layer) {
    feature.layer = layer;
    const data = feature.properties;
    this.centerView = feature.geometry.coordinates;
    const popupContent = `
    <div class='customPopup'>
      <img src="../../../assets/images/bts/expresso.JPG" alt="Image introuvable.">
      <div class='user_info'>
        <strong>Région : </strong>
        <h6>${data.Region}</h6>
      </div>
      <div class='user_info'>
        <strong>Département : </strong>
        <h6>${data.Department}</h6>
      </div>
      <div class='user_info'>
        <strong>Commune : </strong>
        <h6>${data.Commune}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  createAgenceExpressoLayer() {
    const icon = "../../../assets/images/bts/iconeAgence.png";
    this.agencesExpLayer = this.createLayer(
      this.agencesExpresso,
      icon,
      [32, 35],
      this.agenceExpressoLayerPopup
    );

    this.configureSearchControl(this.agencesExpresso, [
      "Department",
      "Region",
      "Commune"
    ]);
    this.map.addLayer(this.agencesExpLayer);
  }

  agenceExpressoLayerPopup(feature, layer) {
    feature.layer = layer;
    const data = feature.properties;
    this.centerView = feature.geometry.coordinates;
    const popupContent = `
    <div class='customPopup'>
      <img src="../../../assets/images/bts/agence.jpg" alt="Image introuvable.">
      <div class='user_info'>
        <strong>Région : </strong>
        <h6>${data.Region}</h6>
      </div>
      <div class='user_info'>
        <strong>Département : </strong>
        <h6>${data.Department}</h6>
      </div>
      <div class='user_info'>
        <strong>Commune : </strong>
        <h6>${data.Commune}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  createBTSTigoLayer() {
    const icon = "../../../assets/images/bts/icon_tigo.png";
    this.btsTigoLayer = this.createLayer(
      this.btsTigo,
      icon,
      [32, 35],
      this.btsTigoLayerPopup
    );
    this.configureSearchControl(this.btsTigo, [
      "Department",
      "Region",
      "Commune"
    ]);
    this.map.addLayer(this.btsTigoLayer);
  }

  btsTigoLayerPopup(feature, layer) {
    feature.layer = layer;
    const data = feature.properties;
    this.centerView = feature.geometry.coordinates;
    const popupContent = `
    <div class='customPopup'>
      <img src="../../../assets/images/bts/tigo.jpg" alt="Image introuvable.">
      <div class='user_info'>
        <strong>Région : </strong>
        <h6>${data.Region}</h6>
      </div>
      <div class='user_info'>
        <strong>Département : </strong>
        <h6>${data.Department}</h6>
      </div>
      <div class='user_info'>
        <strong>Commune : </strong>
        <h6>${data.Commune}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  createBTSOrangeLayer() {
    const icon = "../../../assets/images/bts/iconorange.png";
    this.btsOrangeLayer = this.createLayer(
      this.btsOrange,
      icon,
      [32, 35],
      this.btsOrangeLayerPopup
    );

    this.configureSearchControl(this.btsOrange, [
      "Department",
      "Region",
      "Commune"
    ]);
    this.map.addLayer(this.btsOrangeLayer);
  }

  btsOrangeLayerPopup(feature, layer) {
    feature.layer = layer;
    const data = feature.properties;
    this.centerView = feature.geometry.coordinates;
    const popupContent = `
    <div class='customPopup'>
      <img src="../../../assets/images/bts/orange.jpg" alt="Image introuvable.">
      <div class='user_info'>
        <strong>Région : </strong>
        <h6>${data.Region}</h6>
      </div>
      <div class='user_info'>
        <strong>Département : </strong>
        <h6>${data.Department}</h6>
      </div>
      <div class='user_info'>
        <strong>Commune : </strong>
        <h6>${data.Commune}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  createCovers() {
    this.coversLayer = this.mapLib.createPolygonLayer(
      this.covers,
      this.covsPopupCreator,
      this.coverStyler
    );

    this.map.addLayer(this.coversLayer).fitBounds(this.coversLayer.getBounds());
  }

  covsPopupCreator = (feature, layer) => {
    feature.layer = layer;
    const popupContent = `
    <div class='customPopup'>
      <div class='user_info'>
        <strong>Surface couverte : </strong>
        <h6>${Math.ceil(feature.properties.surf_couv)} Km²</h6>
      </div>
      <div class='user_info'>
        <strong>Pourcentage : </strong>
        <h6>${feature.properties.perc_couv}%</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
    // tslint:disable-next-line:semicolon
  };

  coverStyler(feature) {
    return {
      fillColor: "#00695c",
      weight: 1,
      opacity: 1,
      color: "#00695c",
      fillOpacity: 0.9
    };
  }

  addLegend() {
    if (!this.addTheLegend) {
      return;
    }
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = "<h6 style='text-align: center'>Légende</h6>";
      const grades = [
        "BTS Expresso",
        "Agence Expresso",
        "BTS Tigo",
        "BTS Orange"
      ];
      const labels = [
        "../../../assets/images/bts/iconeExpresso.gif",
        "../../../assets/images/bts/iconeAgence.png",
        "../../../assets/images/bts/icon_tigo.png",
        "../../../assets/images/bts/iconorange.png"
      ];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML += `<div style="float: left; width: 70%; padding-top: 21px; font-size: 12px;">${
          grades[i]
        }</div>
        <div style="float: left; width: 30%"><img src="${
          labels[i]
        }" height='45' width='45'></div><br>`;
      }

      return div;
    };

    legend.addTo(this.map);
  }

  configureSearchControl(data, indexes: string[]) {
    this.searchCtrl.indexFeatures(data, indexes);
  }

  addControl(
    map,
    baseMaps,
    btsExpressoLayer,
    agencesExpLayer,
    btsOrangeLayer,
    btsTigoLayer,
    depsLayer,
    coversLayer
  ) {
    L.control
      .layers(baseMaps, {
        '<img style="padding-right: 10px; height: 25px;" src="../../../assets/images/bts/iconeExpresso.gif" /> BTS Expresso': btsExpressoLayer,
        '<img style="padding-right: 10px; height: 25px;" src="../../../assets/images/bts/iconeAgence.png" /> Agences Expresso': agencesExpLayer,
        '<img style="padding-right: 10px; height: 25px;" src="../../../assets/images/bts/iconorange.png" /> BTS Orange': btsOrangeLayer,
        '<img style="padding-right: 10px; height: 25px;" src="../../../assets/images/bts/icon_tigo.png" /> BTS Tigo': btsTigoLayer,
        '<img style="padding-right: 10px; height: 25px;" src="../../../assets/images/bts/dep.PNG" /> Départements': depsLayer,
        '<img style="padding-right: 10px; height: 25px;" src="../../../assets/images/bts/zc.PNG" /> Zone couverte': coversLayer
      })
      .addTo(map);
  }

  addRouting() {
    this.mapLib.addRouting(this.map);
  }
}
