import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userName: null,
            token: null,
        };
    },
    getters: {
        userName(state) {
            return state.userName;
        },
        isAuthenticated(state) {
            return !!state.token;
        }
    },
    actions: {
        autoLogin(context) {
            const token = localStorage.getItem('token');
            const userName = localStorage.getItem('userName');

            if (token && userName) {
                context.commit('setUser', {
                    userName: userName,
                    token: token,
                });
            }
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userName= payload.userName;
            state.token = payload.token;
        }
    }
});

export default store;