export default ({ $axios, store, redirect }) => {
  $axios.onRequest((config) => {
    if (
      !config.url.includes('login') &&
      !(config.url.includes('users') && config.method === 'post')
    ) {
      config.headers.common['x-access-token'] =
        store.getters['auth/accessToken']
    }
  })

  $axios.onError((error) => {
    const {
      config: { url },
      response: { status }
    } = error

    if (status === 403 || status === 401) {
      if (url.includes('token')) {
        return Promise.reject({
          error: true
        })
      }

      store.dispatch('auth/logout')
    } else {
      return Promise.reject({
        error: true,
        responseType: error.response.headers['content-type'],
        data: error.response.data
      })
    }
  })
}
