<template>
    <LoginComponent :user="user" @login="submit"></LoginComponent>
</template>

<script>
import LoginComponent from "@/components/authentication/LoginCmp";
import { mapActions } from "vuex";

export default {
    name: "Login",
    components: {
        LoginComponent
    },
    data() {
        return {
            user: {
                uid: "",
                pwd: ""
            }
        };
    },
    methods: {
        ...mapActions("authentication", ["signIn"]),

        async submit() {
            await this.signIn(this.user);
            this.$router.push("/admin");
        }
    }
};
</script>