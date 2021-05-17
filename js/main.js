const app = new Vue({
  el: "#container",
  data: {
    personale: [
      {
        name: "Matteo",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Leo",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Noemi",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Brenda",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Giulio",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Piero",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Lapo",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Martino",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Vidhya",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Duia",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "MatteoC",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Giacomo",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Marco",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Filippo",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Tommaso",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Martina",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Temp-1",
        services: 0,
        total: 0,
        active: false,
      },
      {
        name: "Temp-2",
        services: 0,
        total: 0,
        active: false,
      },
    ],
    total: 0,
    totalePersonale: 0,
    serviziPerPersona: 0,
    currentSelected: "",
    totaleServizi: 0,
    isTotalSet: false,
    isStillSelecting: true,
    inputMance: false,
    calculated: false,
    rimasugli: 0,
    maxNum: 0,
    manciaPerServizio: 0,
    totaleErogato: 0,
    giriBonus: 0,
  },

  methods: {
    calculateTips() {
      //aggiungiamo servizi a chi lavora di più
      for (item in this.personale) {
        if (this.personale[item].services >= this.maxNum - 1) {
          this.personale[item].services += 1;
          this.totaleServizi += 1;
        }
      }
      //calcolo mance
      let partial = this.total / this.totaleServizi;
      let manciaPerServizio = Math.round(partial / 0.5) * 0.5;

      if (manciaPerServizio > partial) {
        manciaPerServizio -= 0.5;
      }
      this.manciaPerServizio = manciaPerServizio;
      this.rimasugli = this.total - manciaPerServizio * this.totaleServizi;

      //diviamo le mance!
      for (item in this.personale) {
        this.personale[item].total =
          this.personale[item].services * manciaPerServizio;
        this.totaleErogato += this.personale[item].services * manciaPerServizio;
      }

      //è tempo per i rimasugli
      if (this.rimasugli > 0) {
        let personeCheDividonoRimasugli = 0;
        for (item in this.personale) {
          if (this.personale[item].services > 2) {
            personeCheDividonoRimasugli++;
          }
        }
        while (this.rimasugli > personeCheDividonoRimasugli / 2) {
          for (item in this.personale) {
            if (this.personale[item].services > 2) {
              this.totaleErogato += 0.5;
              this.personale[item].total += 0.5;
              this.rimasugli -= 0.5;
              this.giriBonus++;
            }
          }
        }
      }

      if (this.totaleErogato > this.total) {
        return;
      }

      this.calculated = true;
      this.rimasugli = Number.parseFloat(this.rimasugli).toFixed(2);
    },

    addServices() {
      if (this.serviziPerPersona > 0) {
        for (item in this.personale) {
          if (this.personale[item].name == this.currentSelected) {
            if (this.personale[item].services > 0) {
              this.totaleServizi -= this.personale[item].services;
            }
            this.personale[item].services = this.serviziPerPersona;
            this.personale[item].active = true;
            this.totalePersonale++;
            this.totaleServizi += this.serviziPerPersona;
            if (this.serviziPerPersona > this.maxNum) {
              this.maxNum = this.serviziPerPersona;
            }
          }
          this.inputMance = false;
        }
      }
    },

    allowServices(e) {
      this.inputMance = true;
      this.serviziPerPersona = 0;
      this.currentSelected = e.target.innerText;
    },
    start() {
      if (!isNaN($("#manceTotali").val()) && $("#manceTotali").val() != "") {
        this.total = $("#manceTotali").val();
        this.isTotalSet = true;
      } else {
        $("#manceTotali").val("");
        $("#manceTotali").attr("placeholder", "Solo numeri!");
      }
    },
  },
});
