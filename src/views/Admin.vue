<template>
    <div class="container-fluid text-center">
        <h2>
            <b-icon
                @click="logoutApp"
                class="pointer"
                variant="danger"
                v-b-tooltip.hover
                title="Cerrar Sesion"
                icon="power"
            ></b-icon>
        </h2>
        <div class="pt-2">
            <h2>Panel de Aministración</h2>
            <h4>Seleccione el tipo de operación a realizar</h4>
        </div>
        <!-- Calendario para seleccionar el dia de control -->
        <div class="row justify-content-center mt-3">
            <div id="datepicker" class="col col-lg-6">
                <b-form-datepicker
                    calendar-width="100%"
                    menu-class="w-100"
                    placeholder="Seleccione la fecha a controlar"
                    v-model="dateControl"
                    @context="dateSelected"
                    label-help=""
                    class="mb-2"
                ></b-form-datepicker>
                <h6>
                    Fecha a controlar:
                    <span class="text-danger">{{ dateControl }}</span>
                </h6>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-lg-4 mt-3">
                <button
                    @click="showSolarium =!showSolarium; showPools = false"
                    class="btn btn-menu btn-lg btn-block shadow"
                    type="button"
                    :disabled="!dateControl"
                >AFORO SOLARIUM</button>
            </div>
            <div class="col-12 col-lg-4 mt-3">
                <button
                    @click="showPools =!showPools; showSolarium = false"
                    class="btn btn-menu btn-lg btn-block shadow"
                    type="button"
                    :disabled="!dateControl"
                >AFORO VASOS</button>
            </div>
            <div v-if="!dateControl" class="col-12 mt-1">
                <h4 class="text-danger">Seleccione una fecha antes de elegir una opción</h4>
            </div>
        </div>
        <transition-group
            mode="out-in"
            enter-active-class="slideInLeft"
            leave-active-class="slideOutRight"
        >
            <!-- Control de aforo del solarium -->
            <div
                key="solarium"
                v-if="showSolarium"
                class="row justify-content-center text-center mt-3"
            >
                <h4 class="col-12 mb-3">Control Aforo Solarium</h4>
                <div class="col-12 col-lg-4 text-left">
                    <h5>
                        Aforo actual:
                        <span
                            class="text-muted"
                        >{{ solariumActualOccupation }} personas</span>
                    </h5>
                </div>
                <div class="col-12 text-left col-lg-4 text-lg-right">
                    <h5>
                        Ocupación máxima:
                        <span
                            class="text-muted"
                        >{{ solariumMaxOccupation }} personas</span>
                    </h5>
                </div>
                <div class="col-12 col-lg-8">
                    <b-form-spinbutton
                        v-model="solariumValue"
                        min="0"
                        :max="solariumMaxOccupation"
                        size="lg"
                        class="mb-2"
                    ></b-form-spinbutton>
                    <div class="col-8 text-left px-0">
                        <span
                            v-if="this.solariumValue === this.solariumMaxOccupation"
                            class="text-danger"
                        >Límite de aforo alcanzado.</span>
                    </div>
                    <div class="col-8 text-left px-0">
                        <span
                            v-if="this.solariumValue !== this.solariumActualOccupation"
                            class="text-success"
                        >Aforo modificado. Recuerde guardar la información.</span>
                    </div>
                </div>
                <div class="col-12 col-lg-8 text-left mt-3">
                    <label>Temperatura del Agua</label>
                    <b-form-input
                        type="number"
                        v-model="waterTempValue"
                        placeholder="Temperatura de la piscina grande"
                        trim
                        size="lg"
                    ></b-form-input>
                </div>
            </div>

            <!-- Control de aforo de las piscinas -->
            <div key="pools" v-if="showPools" class="row justify-content-center text-center">
                <h4 class="col-12 mt-3">Control Aforo Piscinas</h4>
                <!-- Piscina Grande -->
                <div class="col-12 col-lg-4 mt-3">
                    <b-card
                        header-text-variant="light"
                        header-bg-variant="info"
                        border-variant="primary"
                        header-tag="header"
                        class="shadow"
                    >
                        <template v-slot:header>
                            <h6 class="mb-0">Piscina grande</h6>
                        </template>
                        <b-card-text>
                            <h6 class="text-left">
                                Aforo actual:
                                <span
                                    class="text-muted"
                                >{{ bigPoolActualOccupation }} personas</span>
                            </h6>
                            <h6 class="text-left">
                                Ocupación máxima:
                                <span
                                    class="text-muted"
                                >{{ bigPoolMaxOccupation }} personas</span>
                            </h6>
                            <b-form-spinbutton
                                v-model="bigPoolValue"
                                min="0"
                                :max="bigPoolMaxOccupation"
                                size="lg"
                                class="mb-2"
                            ></b-form-spinbutton>
                            <div class="col-12 text-left px-0">
                                <span
                                    v-if="this.bigPoolValue === this.bigPoolMaxOccupation"
                                    class="text-danger"
                                >Límite de aforo alcanzado.</span>
                            </div>
                            <div class="col-12 text-left px-0">
                                <span
                                    v-if="this.bigPoolValue !== this.bigPoolActualOccupation"
                                    class="text-success"
                                >Aforo modificado. Recuerde guardar la información.</span>
                            </div>
                        </b-card-text>
                    </b-card>
                </div>
                <!-- Piscina Mediana -->
                <div class="col-12 col-lg-4 mt-3">
                    <b-card
                        header-text-variant="light"
                        header-bg-variant="secondary"
                        border-variant="secondary"
                        header-tag="header"
                        class="shadow"
                    >
                        <template v-slot:header>
                            <h6 class="mb-0">Piscina mediana</h6>
                        </template>
                        <b-card-text>
                            <h6 class="text-left">
                                Aforo actual:
                                <span
                                    class="text-muted"
                                >{{ medPoolActualOccupation }} personas</span>
                            </h6>
                            <h6 class="text-left">
                                Ocupación máxima:
                                <span
                                    class="text-muted"
                                >{{ medPoolMaxOccupation }} personas</span>
                            </h6>
                            <b-form-spinbutton
                                v-model="medPoolValue"
                                min="0"
                                :max="medPoolMaxOccupation"
                                size="lg"
                                class="mb-2"
                            ></b-form-spinbutton>
                            <div class="col-12 text-left px-0">
                                <span
                                    v-if="this.medPoolValue === this.medPoolMaxOccupation"
                                    class="text-danger"
                                >Límite de aforo alcanzado.</span>
                            </div>
                            <div class="col-12 text-left px-0">
                                <span
                                    v-if="this.medPoolValue !== this.medPoolActualOccupation"
                                    class="text-success"
                                >Aforo modificado. Recuerde guardar la información.</span>
                            </div>
                        </b-card-text>
                    </b-card>
                </div>
                <!-- Piscina pequeña -->
                <div class="col-12 col-lg-4 mt-3">
                    <b-card
                        header-text-variant="light"
                        header-bg-variant="warning"
                        border-variant="warning"
                        header-tag="header"
                        class="shadow"
                    >
                        <template v-slot:header>
                            <h6 class="mb-0">Piscina pequeña</h6>
                        </template>
                        <b-card-text>
                            <h6 class="text-left">
                                Aforo actual:
                                <span
                                    class="text-muted"
                                >{{ smallPoolActualOccupation }} personas</span>
                            </h6>
                            <h6 class="text-left">
                                Ocupación máxima:
                                <span
                                    class="text-muted"
                                >{{ smallPoolMaxOccupation }} personas</span>
                            </h6>
                            <b-form-spinbutton
                                v-model="smallPoolValue"
                                min="0"
                                :max="smallPoolMaxOccupation"
                                size="lg"
                                class="mb-2"
                            ></b-form-spinbutton>
                            <div class="col-12 text-left px-0">
                                <span
                                    v-if="this.smallPoolValue === this.smallPoolMaxOccupation"
                                    class="text-danger"
                                >Límite de aforo alcanzado.</span>
                            </div>
                            <div class="col-12 text-left px-0">
                                <span
                                    v-if="this.smallPoolValue !== this.smallPoolActualOccupation"
                                    class="text-success"
                                >Aforo modificado. Recuerde guardar la información.</span>
                            </div>
                        </b-card-text>
                    </b-card>
                </div>
            </div>

            <!-- Boton para salvar la información -->
            <div
                key="button"
                v-if="showSolarium || showPools"
                class="row justify-content-center my-3"
            >
                <div class="col-12 col-lg-8">
                    <button
                        @click="saveInfo"
                        class="btn btn-primary btn-lg btn-block shadow"
                        type="button"
                    >
                        <b-icon icon="check2-square" class="mr-2"></b-icon>GUARDAR INFORMACIÓN
                    </button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
// Vuex
import { mapState, mapMutations, mapActions } from "vuex";

import { settings } from "@/commons/settings.js";
import services from "@/commons/services.js";

export default {
    name: "Admin",
    data() {
        return {
            // Variables para la fecha
            dateControl: "",

            //Temperatura del agua
            waterTempValue: 0,

            // Valores del componente
            showSolarium: false,
            showPools: false,

            // Valores de control solarium
            solariumValue: 0,
            solariumActualOccupation: 0,

            // Valores de control piscina grande
            bigPoolValue: 0,
            bigPoolActualOccupation: 0,

            // Valores de control piscina mediana
            medPoolValue: 0,
            medPoolActualOccupation: 0,

            // Valores de control piscina pequeña
            smallPoolValue: 0,
            smallPoolActualOccupation: 0
        };
    },
    computed: {
        ...mapState("occupation", [
            "solarium",
            "bigPool",
            "mediumPool",
            "smallPool",
            "waterTemp",
            "errorMsg",
            "status",
            "solariumMaxOccupation",
            "bigPoolMaxOccupation",
            "medPoolMaxOccupation",
            "smallPoolMaxOccupation"
        ]),
        ...mapState("authentication", ["user"])
    },
    watch: {
        solariumValue: function() {
            if (
                this.solariumValue === this.solariumMaxOccupation &&
                this.showSolarium
            ) {
                this.makeToast(
                    "danger",
                    "Límite de Aforo",
                    "No se puede permitir el acceso a mas personas, límite de aforo en solarium alcanzado"
                );
            }
        },
        bigPoolValue: function() {
            if (
                this.bigPoolValue === this.bigPoolMaxOccupation &&
                this.showPools
            ) {
                this.makeToast(
                    "danger",
                    "Límite de Aforo",
                    "No se puede permitir el acceso a mas personas, límite de aforo en piscina grande alcanzado"
                );
            }
        },
        medPoolValue: function() {
            if (
                this.medPoolValue === this.medPoolMaxOccupation &&
                this.showPools
            ) {
                this.makeToast(
                    "danger",
                    "Límite de Aforo",
                    "No se puede permitir el acceso a mas personas, límite de aforo en piscina mediana alcanzado"
                );
            }
        },
        smallPoolValue: function() {
            if (
                this.smallPoolValue === this.smallPoolMaxOccupation &&
                this.showPools
            ) {
                this.makeToast(
                    "danger",
                    "Límite de Aforo",
                    "No se puede permitir el acceso a mas personas, límite de aforo en piscina pequeña alcanzado"
                );
            }
        }
    },
    methods: {
        // Mutaciones de carga
        ...mapMutations("loading", ["setLoadAnimation"]),
        ...mapMutations("authentication", ["logout"]),
        // Mutaciones de la ocupación
        ...mapMutations("occupation", [
            "setSolarium",
            "setBigPool",
            "setMediumPool",
            "setSmallPool",
            "setWaterTemp"
        ]),
        // Acciones para recuperar Datos
        ...mapActions("occupation", ["getTotalOccupation"]),
        async dateSelected(date) {
            if (date.selectedYMD) {
                let payload = {
                    dateControl: this.dateControl
                };

                this.showSolarium = false;
                this.showPools = false;
                this.solariumActualOccupation = 0;
                this.solariumValue = 0;
                this.bigPoolActualOccupation = 0;
                this.bigPoolValue = 0;
                this.medPoolActualOccupation = 0;
                this.medPoolValue = 0;
                this.smallPoolActualOccupation = 0;
                this.smallPoolValue = 0;
                this.waterTempValue = 0;

                // Carga de la información actual de ocupación
                await this.getTotalOccupation(payload);

                if (this.status === "success") {
                    this.solariumActualOccupation = this.solarium;
                    this.solariumValue = this.solarium;
                    this.bigPoolActualOccupation = this.bigPool;
                    this.bigPoolValue = this.bigPool;
                    this.medPoolActualOccupation = this.mediumPool;
                    this.medPoolValue = this.mediumPool;
                    this.smallPoolActualOccupation = this.smallPool;
                    this.smallPoolValue = this.smallPool;
                    this.waterTempValue = this.waterTemp;
                } else if (this.status === "warning") {
                    this.makeToast("warning", "Atención", this.errorMsg);
                } else {
                    this.makeToast(
                        "danger",
                        "Error en servidor",
                        this.errorMsg
                    );
                }
            }
        },
        async saveInfo() {
            await this.setLoadAnimation(true);

            // Formateamos el objeto del payload
            let payload = {
                dateControl: this.dateControl,
                solarium: this.solariumValue,
                bigPool: this.bigPoolValue,
                mediumPool: this.medPoolValue,
                smallPool: this.smallPoolValue,
                waterTemp: this.waterTempValue
            };

            // Formateamos el endpoint
            let endpoint = this.showSolarium
                ? "capacity/solarium"
                : "capacity/pools";

            let finalUrl =
                settings.baseURL_API +
                settings.nameAPI +
                settings.versionAPI +
                endpoint;

            // LLamada al servicio de carga de aforo
            await services
                .callToService(finalUrl, payload, "POST", this.user)
                .then(response => {
                    let serverResponse = response.data;

                    if (serverResponse.status === "success") {
                        // Se guarda en Vuex la información actualizada
                        this.saveOccupation(serverResponse.data);

                        this.makeToast(
                            "success",
                            "Operación correcta",
                            serverResponse.message
                        );
                    } else {
                        this.makeToast(
                            "danger",
                            "Error en servidor",
                            serverResponse.message
                        );
                    }
                })
                .catch(error => {
                    this.makeToast(
                        "danger",
                        "Error en servidor",
                        error.message
                    );
                })
                .finally(() => this.setLoadAnimation(false));
        },
        saveOccupation(occupation) {
            this.setSolarium(occupation.solarium);
            this.solariumActualOccupation = occupation.solarium;

            this.setBigPool(occupation.bigPool);
            this.bigPoolActualOccupation = occupation.bigPool;

            this.setMediumPool(occupation.mediumPool);
            this.medPoolActualOccupation = occupation.mediumPool;

            this.setSmallPool(occupation.smallPool);
            this.smallPoolActualOccupation = occupation.smallPool;

            this.setWaterTemp(occupation.waterTemp);
            this.waterTempValue = occupation.waterTemp;
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
        },
        logoutApp() {
            this.logout();
            this.$router.push("/login");
        }
    }
};
</script>

<style>
.pointer {
    cursor: pointer;
}

footer, #datepicker .b-calendar-grid-help.border-top.small.text-muted.text-center.bg-light {
    display: none;
}
</style>