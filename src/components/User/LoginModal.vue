<template>
  <q-modal v-model="loginModal" :content-css="{minWidth: '30vw', minHeight: '35vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>
          Login!
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <q-field
          icon="face"
        >
          <q-input
            v-model="user.username"
            float-label="Username"
          />
        </q-field>
        <q-field
          icon="vpn key"
        >
          <q-input
            v-model="user.password"
            type="password"
            float-label="Password"
          >
          </q-input>
        </q-field>
        <div class="flex flex-center">
          <q-btn
            color="primary"
            class="q-mt-md block"
            label="Submit"
            @click="login"
            :loading="loading"
          >
          </q-btn>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { QModalLayout, QModal, QInput, QField } from 'quasar'
export default {
  components: {
    QModalLayout, QModal, QInput, QField
  },
  name: 'LoginModal',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  props: ['loginModal'],
  methods: {
    login: function () {
      this.loading = true
      this.$store.dispatch('signUserIn', this.user)
        .then(() => { this.loading = false })
    }
  }
}
</script>

<style>
</style>
