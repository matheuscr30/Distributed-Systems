export const state = () => ({
  loggedUser: {}
})

export const getters = {
  loggedUser(state) {
    return state.loggedUser
  }
}

export const mutations = {
  SET_LOGGED_USER(state, loggedUser) {
    state.loggedUser = loggedUser
  }
}

export const actions = {
  clearUser({ commit }) {
    commit('SET_LOGGED_USER', {})
  },
  async loadUser({ commit }) {
    try {
      const response = await this.$axios.$get('users/')
      commit('SET_LOGGED_USER', response.user)
      return { error: false }
    } catch (e) {
      return {
        error: true,
        message: e.data.message
      }
    }
  },
  async post({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('users/', {
        username: data.username,
        password: data.password,
        name: data.name
      })

      dispatch('auth/setAccessToken', response.accessToken, { root: true })
      commit('SET_LOGGED_USER', response.user)
      dispatch('setIsUserLogged', true, { root: true })

      return { error: false }
    } catch (e) {
      return {
        error: true,
        message: e.data.message
      }
    }
  },
  setLoggedUser({ commit }, loggedUser) {
    commit('SET_LOGGED_USER', loggedUser)
  }
}
