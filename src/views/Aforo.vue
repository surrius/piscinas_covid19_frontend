<template>
    <div class="col-11">
        <!-- Aforo -->
        <div class="row no-gutters delimiter mt-3">
            <h3 class="col">Aforo</h3>
            <h3 @click="loadChartData" class="col text-right">
                <b-icon
                    v-b-tooltip.hover
                    title="Actualizar Datos"
                    class="refresh mr-3"
                    icon="arrow-repeat"
                    animation="spin"
                ></b-icon>
            </h3>
        </div>
        <div class="text-right">
            <span class="mr-2">Última actualización: {{ legibleLastUpdate }}</span>
        </div>
        <!-- Area del Solarium -->
        <div class="row justify-content-center mt-3">
            <div v-if="loaded" class="col col-lg-8 text-center">
                <h5>Solarium</h5>
                <h6>Aforo máximo: {{ solariumMaxOccupation }} personas</h6>
                <DonutChart class="bg-white border rounded shadow p-2" :chartData="chartDataSolarium"></DonutChart>
            </div>
        </div>
        <!-- Area de las piscinas -->
        <div class="row justify-content-center">
            <div v-if="loaded" class="col-12 mt-3 col-lg-4 text-center">
                <h5>Piscina Grande</h5>
                <h6>Superficie 400 m2. Aforo máximo: {{ bigPoolMaxOccupation }} personas</h6>
                <DonutChart class="bg-white border rounded shadow p-2" :chartData="chartDataBigPool"></DonutChart>
            </div>
            <div v-if="loaded" class="col-12 mt-3 col-lg-4 text-center">
                <h5>Piscina Mediana</h5>
                <h6>Superficie 120 m2. Aforo máximo: {{ medPoolMaxOccupation }} personas</h6>
                <DonutChart class="bg-white border rounded shadow p-2" :chartData="chartDataMedPool"></DonutChart>
            </div>
            <div v-if="loaded" class="col-12 mt-3 col-lg-4 text-center">
                <h5>Piscina Pequeña</h5>
                <h6>Superficie 167 m2. Aforo máximo: {{ smallPoolMaxOccupation }} personas</h6>
                <DonutChart class="bg-white border rounded shadow p-2" :chartData="chartDataSmallPool"></DonutChart>
            </div>
        </div>
    </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

import DonutChart from "../components/commons/DonutChart.vue";

export default {
    name: "Aforo",
    components: {
        DonutChart
    },
    data() {
        return {
            loaded: false,
            lastUpdate: null,
            legibleLastUpdate: null,
            chartDataSolarium: {
                labels: [],
                datasets: []
            },
            chartDataBigPool: {
                labels: [],
                datasets: []
            },
            chartDataMedPool: {
                labels: [],
                datasets: []
            },
            chartDataSmallPool: {
                labels: [],
                datasets: []
            }
        };
    },
    computed: {
        ...mapState("occupation", [
            "solarium",
            "bigPool",
            "mediumPool",
            "smallPool",
            "errorMsg",
            "status",
            "solariumMaxOccupation",
            "bigPoolMaxOccupation",
            "medPoolMaxOccupation",
            "smallPoolMaxOccupation"
        ])
    },
    async mounted() {
        this.loaded = false;

        // Carga la informacion de las gráficas
        await this.loadChartData();

        this.loaded = true;
    },
    methods: {
        ...mapActions("occupation", ["getTotalOccupation"]),
        async loadChartData() {
            this.lastUpdate = new Date();
            let payload = {
                dateControl: this.lastUpdate
            };

            this.legibleLastUpdate =
                [
                    this.lastUpdate.getDate(),
                    this.lastUpdate.getMonth() + 1,
                    this.lastUpdate.getFullYear()
                ].join("/") +
                " " +
                [
                    this.lastUpdate.getHours(),
                    this.lastUpdate.getMinutes(),
                    this.lastUpdate.getSeconds()
                ].join(":");

            // Carga de la información actual de ocupación
            await this.getTotalOccupation(payload);

            if (this.status === "success") {
                this.loadOccupationInfo();
            } else if (this.status === "error") {
                this.makeToast("danger", "Error en servidor", this.errorMsg);
            }
        },
        loadOccupationInfo() {
            // Datos para la gráfica del Solarium
            let chartDataSolarium = {
                labels: ["Disponible", "Ocupado"],
                datasets: [
                    {
                        backgroundColor: ["#45ba3f", "#eb6f6f"],
                        data: [
                            this.solariumMaxOccupation - this.solarium,
                            this.solarium
                        ]
                    }
                ]
            };
            let chartDataBigPool = {
                labels: ["Disponible", "Ocupado"],
                datasets: [
                    {
                        backgroundColor: ["#45ba3f", "#eb6f6f"],
                        data: [
                            this.bigPoolMaxOccupation - this.bigPool,
                            this.bigPool
                        ]
                    }
                ]
            };
            let chartDataMedPool = {
                labels: ["Disponible", "Ocupado"],
                datasets: [
                    {
                        backgroundColor: ["#45ba3f", "#eb6f6f"],
                        data: [
                            this.medPoolMaxOccupation - this.mediumPool,
                            this.mediumPool
                        ]
                    }
                ]
            };
            let chartDataSmallPool = {
                labels: ["Disponible", "Ocupado"],
                datasets: [
                    {
                        backgroundColor: ["#45ba3f", "#eb6f6f"],
                        data: [
                            this.smallPoolMaxOccupation - this.smallPool,
                            this.smallPool
                        ]
                    }
                ]
            };

            this.chartDataSolarium = chartDataSolarium;
            this.chartDataBigPool = chartDataBigPool;
            this.chartDataMedPool = chartDataMedPool;
            this.chartDataSmallPool = chartDataSmallPool;
        },
        /** Método para crear de forma dinámica Alerts tipo Toast de vue-bootstrap.
         *
         * @param String variant Clase a aplicar
         * @param String typeError Tipo de error a mostrar en la cabecera de la alerta
         * @param String message Mensaje a mostrar
         */
        makeToast(variant, typeError, message) {
            this.$bvToast.toast(message, {
                title: typeError,
                variant: variant,
                toaster: "b-toaster-top-full",
                solid: true
            });
        }
    }
};
</script>

<style>
.refresh {
    color: #00a545;
    cursor: pointer;
    transition: 0.3 ease;
}
.refresh:hover {
    color: #eb6f6f;
    transition: 0.3 ease;
}
</style>