<template>
    <div>
        <div class="absolute">
            <img
                src="@/assets/img/escudo.png"
                class="img-fluid mt-2 ml-3 mt-lg-3 ml-lg-5 size-img"
                alt="Duruelo de la Sierra"
            />
        </div>
        <div class="text-center">
            <img src="@/assets/img/piscinas.png" class="img-fluid header-img" alt="Piscinas" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Header"
};
</script>

<style>
.absolute {
    position: absolute;
    z-index: 9;
}

.bottom {
    bottom: 0;
}

.header-img {
    opacity: 0.7;
}

.size-img {
    width: 30%;
}

/* ******************************************* */
/* ******************************************* */

/* Clases para dispositivos móviles */
@media (max-width: 768px) {
    .size-img {
        width: 15%;
    }
}
</style>