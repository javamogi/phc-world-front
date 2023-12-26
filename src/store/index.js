import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    token: null,
    grantType: null,
    refreshToken: null
  },
  getters: {
    isLogin(state){
      return state.token === null ? false : true;
    },
    getToken(state){
      return state.token;
    },
    getGrantType(state){
      return state.grantType;
    },
    getRefreshToken(state){
      return state.refreshToken;
    }
  },
  mutations: {
    setToken(state, _token){
      state.token = _token;
    },
    setGrantType(state, _grantType){
      state.grantType = _grantType;
    },
    setRefreshToken(state, _refreshToken){
      state.refreshToken = _refreshToken;
    }
  },
  actions: {
    setToken: ({commit}, _token) => {
      commit('setToken', _token);
    },
    setGrantType: ({commit}, _grantType) => {
      commit('setGrantType', _grantType);
    },
    setRefreshToken: ({commit}, _refreshToken) => {
      commit('setRefreshToken', _refreshToken);
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})
