import axios from "axios";

/**
 * Clase que alberga las llamadas axios al servidor.
 * Cada método devuelve una Promesa que será tratada con su try/catch desde el
 * código llamante a fin de capturar posibles errores.
 */
class services {
  callToService(url, payload, httpVerb, credentials) {
    if (credentials) {
      return axios({
        method: httpVerb,
        url: url,
        data: payload,
        params: credentials,
      });
    } else {
      return axios({
        method: httpVerb,
        url: url,
        params: payload,
      });
    }
  }
}

export default new services();
