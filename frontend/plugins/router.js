const routesWithoutProtection = ['login']

export default ({ app }) => {
  app.router.beforeEach(async (to, from, next) => {
    const accessToken = await app.$cookies.get('ACCESS_TOKEN')

    if (accessToken !== undefined && !app.store.getters.isUserLogged) {
      app.store.dispatch('auth/setAccessToken', accessToken)
      app.store.dispatch('setIsUserLogged', true)

      const res = await app.store.dispatch('users/loadUser')
      if (res.error) await app.store.dispatch('auth/logout')
    }

    if (accessToken === undefined) {
      if (routesWithoutProtection.includes(to.name)) return next()
      return next({ name: 'login' })
    } else {
      if (to.name === 'login') return next({ name: 'index-dashboard' })
      return next()
    }
  })
}
