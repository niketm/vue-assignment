import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import axios from 'axios';
import App from './App.vue'
import { routes } from './routes';
import store from './store/store';
import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdB65uWCoJ7lPM7q4MVuqM4JesBFrpWHQ",
    authDomain: "stockdata-ff4d3.firebaseapp.com",
    databaseURL: "https://stockdata-ff4d3.firebaseio.com",
    projectId: "stockdata-ff4d3",
    storageBucket: "stockdata-ff4d3.appspot.com",
    messagingSenderId: "766504368284"
  };
  firebase.initializeApp(config);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.prototype.$axios = axios;


const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
