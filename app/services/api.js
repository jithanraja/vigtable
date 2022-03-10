import axios from "axios";
import config from "../config/appConfig";
import EventEmitter from "react-native-eventemitter";

const BASE_URL = config.server_url;

axios.defaults.validateStatus = (status) => {
  return status >= 200 && status <= 500;
};

axios.defaults.timeout = 60000;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["accept"] = "application/json";

/*
  Use axios interceptors to configure headers, show response error messages etc.
*/
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      console.log(response.data.Message);
      if (
        response.data.Status === "error" &&
        (response.data.Message === "jwt expired" ||
          response.data.Message === "jwt must be provided")
      ) {
        EventEmitter.emit("USER_TOKEN_EXPIRED_NOTIFICATION");
      }
    }
    return response;
  },
  (error) => {
    console.error("Interceptor Error "+error);
    if (error.response !== undefined) {
      alert(error);
    }
    return Promise.reject(error);
  }
);

export function configureAPI() {
  axios.defaults.headers.post["crossDomain"] = true;
  axios.defaults.headers.common["x-access-token"] = global.app.accessToken
    ? global.app.accessToken
    : "";
}

export function getCall(url, params = null) {
  return axios.get(BASE_URL + url, { params: params });
}

export function getDirectCall(url, params = null) {
  return axios.get(url, { params: params });
}

export function putCall(url, body) {
  return axios.put(BASE_URL + url, body);
}

export function patchCall(url, body, config) {
  return axios.patch(BASE_URL + url, body, config);
}

export function postCall(url, body, isUrlEncoded = false, source = null,isMultiPart = false) {
  if (isUrlEncoded) {
    axios.defaults.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
  } else if (isMultiPart) {
    axios.defaults.headers.post["Content-Type"] =
      "multipart/form-data";
  } else {
    axios.defaults.headers.common["Content-Type"] = "application/json";
  }
  console.log("HEEEEED=",axios.defaults.headers)
  if(source == null) {
  return axios.post(BASE_URL + url, body);
  }else {
    return axios.post(BASE_URL+url,body,{cancelToken: source.token});
  }
}

export function deleteCall(url, params = null) {
  return axios.delete(BASE_URL + url, { params: params });
}

export function getAxios() {
  return axios;
}