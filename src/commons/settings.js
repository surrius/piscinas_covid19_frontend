"use strict";

// Configuración para despliegues en servidor
const settings_prod = {
    baseURL_API: "http://cita.duruelodelasierra.es/",
    nameAPI: "",
    versionAPI: "api/v1/"
};

// Configuración para pruebas en entorno local
const settings_dev = {
    baseURL_API: "http://localhost:8090/",
    nameAPI: "",
    versionAPI: "api/v1/"
};

var final_settings;
if (process.env.NODE_ENV === "production") {
    final_settings = settings_prod;
} else {
    final_settings = settings_dev;
}

export const settings = final_settings;