<template>
  <div id="welcome">
    <v-app>
      <v-content id="index-content">
        <section>
          <dialog-auth @submitted="submitted($event)" />
        </section>
      </v-content>

      <app-snackbar
        v-if="snackbar.active"
        :visible="snackbar.active"
        :data="snackbar.data"
        @close="snackbar.active = false"
      />
    </v-app>
  </div>
</template>

<script>
import DialogAuth from '@/components/Dialogs/Auth'
import Snackbar from '@/components/Utils/Snackbar'

export default {
  name: 'Login',
  head() {
    return {
      title: 'Slack'
    }
  },
  components: {
    'app-snackbar': Snackbar,
    'dialog-auth': DialogAuth
  },
  data() {
    return {
      snackbar: {
        active: false,
        data: {}
      }
    }
  },
  methods: {
    activateSnackbar(text, hasError) {
      this.snackbar.data.text = text

      if (hasError) {
        this.snackbar.data.color = this.$vuetify.theme.currentTheme.danger
      } else {
        this.snackbar.data.color = this.$vuetify.theme.currentTheme.success
      }

      this.snackbar.active = true
    },
    submitted(data) {
      if (data.error === true) {
        this.activateSnackbar(data.message, true)
      } else {
        this.$router.push({ name: 'index-dashboard' })
      }
    }
  }
}
</script>

<style scoped>
#index-content {
  background: url('~assets/img/background.png') no-repeat;
  background-size: 100% 100%;
}
</style>
