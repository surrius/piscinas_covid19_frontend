<template>
    <div class="container-fluid">
        <div class="row">
            <div class="d-none d-md-flex col-md-4 col-lg-6 p-0 m-0 bg-image">
                <img src="@/assets/img/login.png" class="img-fluid" alt="Duruelo de la Sierra" />
            </div>
            <div class="col-md-8 col-lg-6">
                <div class="login d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-9 col-lg-8 mx-auto">
                                <h3 class="login-heading mb-4">Acceso Administrador</h3>
                                <form @submit.prevent="$emit('login')">
                                    <div class="form-group">
                                        <label>Usuario</label>
                                        <input
                                            required
                                            autofocus
                                            name="username"
                                            id="username"
                                            type="text"
                                            v-model="user.uid"
                                            @keyup.enter="$emit('login')"
                                            class="form-control"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input
                                            required
                                            v-model="user.pwd"
                                            name="password"
                                            id="password"
                                            type="password"
                                            @keyup.enter="$emit('login')"
                                            class="form-control"
                                        />
                                    </div>

                                    <button
                                        class="btn btn-menu btn-lg btn-block"
                                        type="submit"
                                    >Acceder</button>
                                </form>
                                <div class="col mt-3 p-0">
                                    <b-alert v-if="error" show variant="danger">{{ errorMessage }}</b-alert>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "LoginComponent",
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState("authentication", ["error", "errorMessage"])
    },
    methods: {}
};
</script>

<style>
.login,
.image {
    min-height: 100vh;
}

.bg-image {
    opacity: 0.6;
}

.login-heading {
    font-weight: 400;
}
</style>