import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";


axios.interceptors.response.use(undefined, function(error) {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch("LogOut");
            console.log('Token expired')
            return router.push("/login");
        }
    }
});

createApp(App).use(store).use(router).mount("#app");