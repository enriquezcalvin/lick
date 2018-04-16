<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Lick Iced Tea
          <!--<div slot="subtitle">Running on Quasar v{{ $q.version }}</div>-->
        </q-toolbar-title>
        <q-btn
          flat
          dense
        >
          <q-icon name="account circle" />
          <q-popover
            :anchor="anchor"
            :self="self"
          >
            <q-list link style="min-width: 100px" v-if="loggedIn">
              <q-item
                v-for="n in 3"
                :key="`b-${n}`"
                v-close-overlay
              >
                <q-item-main label="Label " />
              </q-item>
              <q-item>
                <q-icon name="exit to app" class="q-mr-md" />
                <q-item-main label="Logout" />
              </q-item>
            </q-list>

            <q-list link style="min-width: 100px" v-else>
              <q-item @click.native="login = true">
                <q-icon name="lock open" class="q-mr-md" />
                <q-item-main label="Login" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <login-modal :loginModal="login"></login-modal>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Modules</q-list-header>
        <q-item to="/production">
          <q-item-side icon="description" />
          <q-item-main label="Production"/>
        </q-item>
        <q-item to="/inventory">
          <q-item-side icon="description" />
          <q-item-main label="Inventory"/>
        </q-item>
        <q-item to="/accounts">
          <q-item-side icon="fas fa-dollar-sign" />
          <q-item-main label="Sales and Accounting"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, QPopover } from 'quasar'
import LoginModal from 'components/User/LoginModal'
export default {
  components: {
    QPopover,
    LoginModal
  },
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      anchorOrigin: {vertical: 'bottom', horizontal: 'left'},
      selfOrigin: {vertical: 'top', horizontal: 'left'},
      popover: false,
      login: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    anchor () {
      return `${this.anchorOrigin.vertical} ${this.anchorOrigin.horizontal}`
    },
    self () {
      return `${this.selfOrigin.vertical} ${this.selfOrigin.horizontal}`
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
