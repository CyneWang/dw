import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userName: "",
        navIndex: "2-1-6",
    },
    mutations: {
        getUserName(state, data) {
            state.userName = data;
        },
        navyIndex(state,index){
            state.navIndex = index;
        },
    },
    actions: {}
})
