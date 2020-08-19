<template>
    <div id="app">
        <loading
            :active.sync="isLoading"
            :color="'#00c57a'"
            :loader="'dots'"
            :width="70"
            :height="70"
        ></loading>
        <transition
            mode="out-in"
            name="bounce"
            enter-active-class="bounceInLeft"
            leave-active-class="bounceOutLeft"
        >
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
// CSS principal de la aplicacion
import "@/assets/css/styles.css";

//Vuex
import { mapState } from "vuex";

// Componente y estilos de la animacion de carga
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name: "App",
    components: {
        Loading
    },
    computed: {
        ...mapState("loading", ["isLoading"])
    }
};
</script>

<style>
</style>
