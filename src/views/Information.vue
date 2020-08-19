<template>
    <div class="col-11 mt-3">
        <div class="row bg-white shadow text-center py-2">
            <div class="col">
                <h5>Temperatura actual del agua en la piscina grande:</h5>
                <h3 class="temp-color">{{ waterTemp }}º C</h3>
            </div>
        </div>
        <div class="row justify-content-center mt-3">
            <div class="col shadow" id="c_0709b335bfd9372efe2f293248561afe"></div>
        </div>
    </div>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

export default {
    name: "Information",
    computed: {
        ...mapState("occupation", ["waterTemp"]),
        ...mapState("authentication", ["user"])
    },
    mounted() {
        if (!this.waterTemp) {
            this.loadData();
        }

        // Tamaño normal
        let recaptchaScript = document.createElement("script");
        recaptchaScript.setAttribute(
            "src",
            "https://www.eltiempo.es/widget/widget_loader/0709b335bfd9372efe2f293248561afe"
        );
        document
            .getElementById("c_0709b335bfd9372efe2f293248561afe")
            .appendChild(recaptchaScript);
    },
    methods: {
        ...mapActions("occupation", ["getTotalOccupation"]),
        async loadData() {
            let payload = {
                dateControl: new Date()
            };

            // Carga de la información actual de ocupación
            await this.getTotalOccupation(payload);

            if (this.status === "error") {
                this.makeToast("danger", "Error en servidor", this.errorMsg);
            }
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
.temp-color {
    color: #0645b1;
}
</style>