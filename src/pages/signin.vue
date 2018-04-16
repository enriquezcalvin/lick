<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <q-field
          icon="face"
        >
          <q-input
            v-model="user.username"
            float-label="Username"
          />
        </q-field>
      </div>
      <div class="col-12 q-mt-md">
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
      </div>
      <div class="col-12 q-mt-md">
        <q-btn :loading="loading" color="primary" class="block" label="Submit" @click="login" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { QInput, QField } from 'quasar'
export default {
  components: {
    QInput,
    QField
  },
  data: () => ({
    user: {
      username: '',
      password: ''
    },
    loading: false
  }),
  methods: {
    login: function () {
      this.loading = true
      this.$store.dispatch('user/signUserIn', this.user)
        .then(() => { this.loading = false })
    }
  }
}
</script>
