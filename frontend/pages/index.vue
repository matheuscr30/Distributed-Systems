<template>
  <v-app>
    <v-app-bar v-if="$isMobile" app dark color="#3F0E40">
      <v-app-bar-nav-icon @click="toggleNavigationDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Slack</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="navigationDrawer"
      app
      dark
      :expand-on-hover="smOnly"
      :permanent="!$isMobile"
      color="#3F0E40"
    >
      <v-layout column fill-height>
        <v-list dense nav>
          <v-list-item two-line class="profile-nav">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span v-if="user.name">{{ user.name }}</span>
                <span v-else>{{ user.username }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <template v-for="(item, index) in navigationItemsTop">
            <v-list-item
              v-if="item.ref || item.action"
              :id="'item' + index.toString()"
              :key="item.title"
              @click="clickNavigationItem(item)"
            >
              <v-list-item-icon>
                <v-icon v-if="item.icon">
                  {{ item.icon }}
                </v-icon>
                <font-awesome-icon
                  v-else-if="item.faicon"
                  :icon="item.faicon"
                  class="fa-icons"
                />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-else-if="item.divider" :key="index" class="ma-2" />
          </template>
        </v-list>

        <v-spacer />

        <v-list dense nav>
          <template v-for="(item, index) in navigationItemsBottom">
            <v-list-item
              v-if="item.ref || item.action"
              :id="'item' + index.toString()"
              :key="item.title"
              @click="clickNavigationItem(item)"
            >
              <v-list-item-icon>
                <v-icon v-if="item.icon">
                  {{ item.icon }}
                </v-icon>
                <font-awesome-icon
                  v-else-if="item.faicon"
                  :icon="item.faicon"
                  class="fa-icons"
                />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-layout>
    </v-navigation-drawer>

    <v-content>
      <v-container grid-list-xl fluid>
        <nuxt-child />
      </v-container>
    </v-content>

    <v-footer>
      <v-flex text-center xs-12 class="caption py-1">
        &copy; {{ new Date().getFullYear() }}
        <br />
        Made by Matheus Cunha Reis
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      navigationDrawer: true,
      navigationItemsTop: [
        {
          icon: 'dashboard',
          title: 'Dashboard',
          ref: 'index-dashboard',
          params: {}
        },
        {
          icon: 'poll',
          title: 'Polls',
          ref: 'index-polls',
          params: {}
        }
      ],
      navigationItemsBottom: [
        {
          icon: 'help',
          title: 'Help',
          ref: 'index-help',
          params: {}
        },
        {
          icon: 'settings',
          title: 'Settings',
          ref: 'index-settings',
          params: {}
        },
        {
          icon: 'power_settings_new',
          title: 'Logout',
          action: () => {
            this.logout()
          }
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/loggedUser']
    },
    smOnly() {
      if (this.$store.getters.isHydrated) {
        return this.$vuetify.breakpoint.smOnly
      } else {
        return true
      }
    }
  },
  watch: {
    $isMobile() {
      this.navigationDrawer = !this.$isMobile
    }
  },
  created() {
    if (this.$route.name === 'index') {
      this.$router.push({ name: 'index-dashboard' })
    }

    this.navigationDrawer = !this.$isMobile
  },
  methods: {
    clickNavigationItem(item) {
      if ('ref' in item) {
        this.$router.push({ name: item.ref })
      } else if ('action' in item) {
        item.action()
      }
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
    },
    toggleNavigationDrawer() {
      this.navigationDrawer = !this.navigationDrawer
    }
  }
}
</script>

<style scoped></style>
