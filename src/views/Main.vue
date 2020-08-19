<template>
    <section>
        <!-- Cabecera -->
        <Header></Header>

        <!-- Menu de opciones -->
        <div class="container-fluid">
            <!-- MENU -->
            <!-- Solo visible para pantallas grandes -->
            <div class="d-none d-lg-block">
                <div class="row justify-content-center align-items-center menu mt-1">
                    <div class="col-auto text-center my-2">
                        <img
                            src="@/assets/img/logo.png"
                            class="img-fluid"
                            alt="Duruelo de la Sierra"
                        />
                    </div>
                    <div class="col my-2">
                        <button
                            @click="navigateTo('/proposito')"
                            type="button"
                            class="btn btn-menu btn-lg btn-block"
                        >PROPÓSITO</button>
                    </div>
                    <div class="col my-2">
                        <button
                            @click="navigateTo('/aforo')"
                            type="button"
                            class="btn btn-menu btn-lg btn-block"
                        >AFORO</button>
                    </div>
                    <div class="col my-2">
                        <button
                            @click="navigateTo('/informacion')"
                            type="button"
                            class="btn btn-menu btn-lg btn-block"
                        >INFORMACIÓN</button>
                    </div>
                </div>
            </div>
            <!-- Solo visible para pantallas pequeñas -->
            <div class="d-xs-block d-lg-none mt-1">
                <div class="row justify-content-center menu pt-2 text-white">
                    <div v-if="!showMenu" @click="showMenu=true" class="col-12 text-center">
                        <b-icon class="h1" icon="grip-vertical"></b-icon>
                    </div>
                    <div v-if="showMenu" class="col-11 mt-2">
                        <button
                            @click="navigateTo('/proposito')"
                            type="button"
                            class="btn btn-menu btn-lg btn-block"
                        >PROPÓSITO</button>
                    </div>
                    <div v-if="showMenu" class="col-11 mt-2">
                        <button
                            @click="navigateTo('/aforo')"
                            type="button"
                            class="btn btn-menu btn-lg btn-block"
                        >AFORO</button>
                    </div>
                    <div v-if="showMenu" class="col-11 my-2">
                        <button
                            @click="navigateTo('/informacion')"
                            type="button"
                            class="btn btn-menu btn-lg btn-block"
                        >INFORMACIÓN</button>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center mb-5">
                <transition
                    mode="out-in"
                    name="bounce"
                    enter-active-class="bounceInLeft"
                    leave-active-class="bounceOutLeft"
                >
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <Footer></Footer>
    </section>
</template>

<script>
import Header from "../components/commons/Header.vue";
import Footer from "../components/commons/Footer.vue";

export default {
    name: "Main",
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            showMenu: false
        };
    },
    methods: {
        navigateTo(path) {
            if (this.$route.path !== path) {
                this.$router.push({
                    path: path
                });
            }
            this.showMenu = false;
        }
    }
};
</script>

<style>
.menu {
    background-color: #05a849;
}
</style>