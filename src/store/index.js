import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    grantType: null
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
    }
  },
  mutations: {
    setToken(state, _token){
      state.token = _token;
    },
    setGrantType(state, _grantType){
      state.grantType = _grantType;
    }
  },
  actions: {
    setToken: ({commit}, _token) => {
      commit('setToken', _token);
    },
    setGrantType: ({commit}, _grantType) => {
      commit('setGrantType', _grantType);
    }
  },
  modules: {
  }
})
