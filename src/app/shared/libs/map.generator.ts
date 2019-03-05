/** allright reserved contact sidymbengue25@gmail.com */
export class MapGenerator {
  map: any;
  mapDiv;
  centerView: number[];
  options: {
    zoomControl: boolean;
    maxZoom: number;
    minZoom: number;
  };
  constructor() {}

  init(
    mapDiv,
    centerView?: number[],
    options?: {
      zoomControl: boolean;
      maxZoom: number;
      minZoom: number;
    }
  ) {
    this.mapDiv = mapDiv;
    this.centerView = centerView ? centerView : [-17.4521430604, 14.6977836964];
    this.options = Object.assign(
      {},
      {
        zoomControl: true,
        maxZoom: 28,
        minZoom: 1
      },
      options
    );
  }

  createMap() {
    return (this.map = L.map(this.mapDiv, this.options).setView(
      this.centerView,
      13
    ));
  }

  createPan(map, paneName, mode) {
    map.createPane(paneName);
    map.getPane(paneName).style.zIndex = 400;
    map.getPane(paneName).style["mix-blend-mode"] = mode;
  }

  disableDoubleClickZoom() {
    return this.map.doubleClickZoom.disable();
  }

  addAttribution(attribution) {
    this.map.attributionControl.addAttribution(attribution);
  }

  changeDefaultIconPath(path) {
    L.Icon.Default.imagePath = path;
  }

  createABasmapeLayer(url, add = true) {
    const basemap = L.tileLayer(url, {
      maxZoom: 25,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    });
    if (add === false) {
      // this.baseMaps+=basemap;
      return basemap;
    } else if (add === true) {
      basemap.addTo(this.map);
      // this.baseMaps=basemap;
      return basemap;
    }
  }
  createOSMBasemap(): any {
    return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    });
  }
  /**
   * it need the leafle-measure.js library to work
   */
  addMeasurementControl() {
    // const measureControl = new L.Control.Measure({
    //   primaryLengthUnit: "meters",
    //   secondaryLengthUnit: "kilometers",
    //   primaryAreaUnit: "sqmeters",
    //   secondaryAreaUnit: "hectares"
    // });
    L.control
      .polylineMeasure({
        position: "topleft",
        unit: "metres",
        showBearings: true,
        clearMeasurementsOnStop: false,
        showClearControl: true,
        showUnitControl: true
      })
      .addTo(this.map);
  }

  addBasemapControlLayer(baseMaps) {
    L.control.layers(baseMaps).addTo(this.map);
  }

  addGeolocation() {
    return L.control.locate().addTo(this.map);
  }

  addPointGeoJSONLayer(
    jsonData: any,
    icon: string,
    iconSize: number[],
    popupCreator,
    paneName?
  ) {
    const iconToDisplay = L.icon({
      iconUrl: icon,
      iconSize // size of the icon
    });
    const layerName = new L.geoJSON(jsonData, {
      onEachFeature: popupCreator,
      // pane
      pointToLayer: (feature, latlng) => {
        const label = String(feature.properties.nom);
        return L.marker(latlng, {
          icon: iconToDisplay
        }).bindTooltip(label, {
          opacity: 0.7,
          className: "my-labels"
        });
      }
    });
    // this.map.addLayer(layerName).fitBounds(layerName.getBounds());
    return layerName;
  }

  createPolygonLayer(data, popupCreator, styleFunction) {
    return L.geoJSON(data, {
      onEachFeature: popupCreator,
      style: styleFunction
    });
  }

  highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 1.4,
      color: "black",
      fillColor: "yellow",
      fillOpacity: 0.9
    });
  }

  addThisLayer(layerName) {
    if (this.map.hasLayer(layerName)) {
      return;
    } else {
      layerName.addTo(this.map);
    }
  }

  removeThisLayer(layerName) {
    if (this.map.hasLayer(layerName)) {
      this.map.removeLayer(layerName);
      return;
    } else {
      //
    }
  }

  get addFuseSearch() {
    const searchCtrl = L.control.fuseSearch({
      position: "topright",
      title: "faire une recherche ...",
      placeholder: "rechercher une personne, un client, ...",
      showResultFct: (feature, container) => {
        const props = feature.properties;
        const details = props.Department
          ? props.Department
          : `Région de ${props.Region}`;
        const name = L.DomUtil.create("b", null, container);
        name.innerHTML = props.nom ? props.nom : props.Department;
        container.appendChild(L.DomUtil.create("br", null, container));
        container.appendChild(document.createTextNode(details));
      }
    });
    searchCtrl.addTo(this.map);
    return searchCtrl;
  }

  addSearchLayer(layerName, searchField, options = {}) {
    const customOptions = Object.assign(
      {},
      {
        circleLocation: false,
        hideMarkerOnCollapse: true
      },
      options
    );
    const searchLayer = new L.Control.Search({
      layer: layerName,
      zoom: 12.5,
      propertyName: searchField,
      circleLocation: customOptions.circleLocation
        ? customOptions.circleLocation
        : false,
      hideMarkerOnCollapse: customOptions.hideMarkerOnCollapse
        ? customOptions.hideMarkerOnCollapse
        : false
    });
    this.map.addControl(searchLayer);
  }

  createButton(label, container) {
    const btn = L.DomUtil.create("button", "", container);
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "wayBtn");
    btn.innerHTML = label;
    return btn;
  }
  addRouting(map) {
    // const ReversablePlan = L.Routing.Plan.extend({
    //   createGeocoders() {
    //     const container = L.Routing.Plan.prototype.createGeocoders.call(this);
    //     const reverseButton = this.createButton("↑↓", container);
    //     return container;
    //   }
    // });
    // console.log(L.Control)

    // const plan = new ReversablePlan(
    //   [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    //   {
    //     geocoder: L.Control.Geocoder.nominatim(),
    //     routeWhileDragging: true
    //   }
    // );

    const control = L.Routing.control({
      routeWhileDragging: true,
      waypoints: [L.latLng(14.649, -17.4679), L.latLng(14.689, -17.4979)]
    }).addTo(map);

    map.on("click", e => {
      const container = L.DomUtil.create("div");
      const startBtn = this.createButton("Point de départ", container);
      const destBtn = this.createButton("Point d'arrivé", container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
      L.DomEvent.on(startBtn, "click", () => {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, "click", () => {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });
    });
  }

  // addGeocoder(map) {
  //   const node = document.createElement("script");
  //   node.src =
  //     "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js";
  //   node.type = "text/javascript";
  //   // node.async = true;
  //   node.charset = "utf-8";
  //   document.querySelector("body").appendChild(node);
  //   this.addRouting(map);
  // }
}
