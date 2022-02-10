import { STORAGE_NAMES } from 'consts'

export default {
  namespaced: true,
  clearable: true,
  getters: {
    isAuth: state => {
      return state.isAuth
    },
    accessToken ( state ) {
      return state.tokens.access
    },
    refreshToken ( state ) {
      return state.tokens.refresh
    },
    tokens ( state ) {
      return state.tokens
    }

  },
  mutations: {
    setIsAuth ( state, payload ) {
      state.isAuth = payload
    },
    setTokens ( state, tokens ) {
      state.tokens = { ...tokens }
    },
    clearModule ( state ) {
      state.isAuth = null
      state.tokens = {
        access: null,
        refresh: null,
      }
    }
  },
  state: {
    isAuth: true, // TODO поменять на null
    tokens: {
      access: null,
      refresh: localStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ) || sessionStorage.getItem( STORAGE_NAMES.REFRESH_TOKEN ),
    }

  },
}
