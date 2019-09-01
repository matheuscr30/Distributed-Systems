export const state = () => ({
  accessToken: '',
  expiresTime: 60 * 60 * 24 * 7
})

export const getters = {
  accessToken(state) {
    return state.accessToken
  }
}

export const mutations = {
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  }
}

export const actions = {
  async login({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('login/', {
        username: data.username,
        password: data.password
      })

      dispatch('auth/setAccessToken', response.accessToken, { root: true })
      dispatch('users/setLoggedUser', response.user, { root: true })
      dispatch('setIsUserLogged', true, { root: true })

      return { error: false }
    } catch (e) {
      return {
        error: true,
        message: e.data.message
      }
    }
  },
  async logout({ commit, dispatch }) {
    await this.$cookies.removeAll()
    commit('SET_ACCESS_TOKEN', '')
    dispatch('setIsUserLogged', false, { root: true })
    dispatch('users/clearUser', null, { root: true })
    this.$router.push({ name: 'login' })
  },
  async setAccessToken({ commit, state }, accessToken) {
    commit('SET_ACCESS_TOKEN', accessToken)
    await this.$cookies.set('ACCESS_TOKEN', accessToken, {
      path: '/',
      maxAge: state.expiresTime
    })
  }
}
