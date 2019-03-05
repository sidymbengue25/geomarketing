import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RegionService {
  regions: any[] = [
    {
      nom: "Dakar",
      departments: [
        {
          nom: "Dakar",
          id_dep: 1
        },
        {
          nom: "Guédiawaye",
          id_dep: 2
        },
        {
          nom: "Pikine",
          id_dep: 3
        },
        {
          nom: "Rufisque",
          id_dep: 4
        }
      ]
    },
    {
      nom: "Thiès",
      departments: [
        {
          nom: "Thiès",
          id_dep: 41
        },
        {
          nom: "Mbour",
          id_dep: 40
        },
        {
          nom: "Tivaouane",
          id_dep: 42
        }
      ]
    },
    {
      nom: "Ziguinchor",
      departments: [
        {
          nom: "Ziguinchor",
          id_dep: 45
        },
        {
          nom: "Bignona",
          id_dep: 43
        },
        {
          nom: "Oussouye",
          id_dep: 44
        }
      ]
    },
    {
      nom: "Sédhiou",
      departments: [
        {
          nom: "Bounkiling",
          id_dep: 30
        },
        {
          nom: "Goudomp",
          id_dep: 31
        },
        {
          nom: "Sédhiou",
          id_dep: 32
        }
      ]
    },
    {
      nom: "Louga",
      departments: [
        {
          nom: "Kébémer",
          id_dep: 24
        },
        {
          nom: "Linguère",
          id_dep: 25
        },
        {
          nom: "Louga",
          id_dep: 26
        }
      ]
    },
    {
      nom: "Saint-Louis",
      departments: [
        {
          nom: "Dagana",
          id_dep: 33
        },
        {
          nom: "Podor",
          id_dep: 34
        },
        {
          nom: "Saint-Louis",
          id_dep: 35
        }
      ]
    },
    {
      nom: "Diourbel",
      departments: [
        {
          nom: "Bambey",
          id_dep: 5
        },
        {
          nom: "Diourbel",
          id_dep: 6
        },
        {
          nom: "Mbacké",
          id_dep: 7
        }
      ]
    },
    {
      nom: "Tambacounda",
      departments: [
        {
          nom: "Bakel",
          id_dep: 36
        },
        {
          nom: "Goudiry",
          id_dep: 37
        },
        {
          nom: "Koupentoum",
          id_dep: 38
        },
        {
          nom: "Tambacounda",
          id_dep: 39
        }
      ]
    },
    {
      nom: "Matam",
      departments: [
        {
          nom: "Kanel",
          id_dep: 27
        },
        {
          nom: "Matam",
          id_dep: 28
        },
        {
          nom: "Ranérou Ferlo",
          id_dep: 29
        }
      ]
    },
    {
      nom: "Kédougou",
      departments: [
        {
          nom: "Kédougou",
          id_dep: 11
        },
        {
          nom: "Salémata",
          id_dep: 12
        },
        {
          nom: "Saraya",
          id_dep: 13
        }
      ]
    },
    {
      nom: "Kolda",
      departments: [
        {
          nom: "Kolda",
          id_dep: 21
        },
        {
          nom: "Médina Yoro Foula",
          id_dep: 22
        },
        {
          nom: "Vélingara",
          id_dep: 23
        }
      ]
    },
    {
      nom: "Kaffrine",
      departments: [
        {
          nom: "Birkilane",
          id_dep: 14
        },
        {
          nom: "Kaffrine",
          id_dep: 15
        },
        {
          nom: "Koungheul",
          id_dep: 16
        },
        {
          nom: "Malème Hodar",
          id_dep: 17
        }
      ]
    },
    {
      nom: "Fatick",
      departments: [
        {
          nom: "Fatick",
          id_dep: 8
        },
        {
          nom: "Foundiougne",
          id_dep: 9
        },
        {
          nom: "Gossas",
          id_dep: 10
        }
      ]
    },
    {
      nom: "Kaolack",
      departments: [
        {
          nom: "Guinguinéo",
          id_dep: 18
        },
        {
          nom: "Kaolack",
          id_dep: 19
        },
        {
          nom: "Nioro du Rip",
          id_dep: 20
        }
      ]
    }
  ];
  constructor() {}

  getRegion(regName) {
    return this.regions.find(reg => reg.nom === regName);
  }
}
