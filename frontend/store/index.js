export const state = () => ({
  isHydrated: false,
  isUserLogged: false
})

export const getters = {
  isHydrated(state) {
    return state.isHydrated
  },
  isUserLogged(state) {
    return state.isUserLogged
  }
}

export const mutations = {
  SET_IS_HYDRATED(state, isHydrated) {
    state.isHydrated = isHydrated
  },
  SET_IS_USER_LOGGED(state, isUserLogged) {
    state.isUserLogged = isUserLogged
  }
}

export const actions = {
  setIsHydrated({ commit }, isHydrated) {
    commit('SET_IS_HYDRATED', isHydrated)
  },
  setIsUserLogged({ commit }, isUserLogged) {
    commit('SET_IS_USER_LOGGED', isUserLogged)
  }
}
