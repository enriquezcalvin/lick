<template>
  <div>
    <q-tabs>
      <q-route-tab slot="title" label="Finished Goods" icon="thumb up" to="/products" />
      <q-route-tab slot="title" label="Raw Materials" icon="shopping basket" to="/products/raw" />
    </q-tabs>
    <router-view />
    
  </div>
</template>

<style>
</style>

<script>
import { QTabs, QTab, QBtn, QRouteTab } from 'quasar'
export default {
  components: {
    QTabs,
    QRouteTab,
    QBtn
  },
  name: 'PageProduct',
  data () {
    return {
      tab: 'mails'
    }
  }
}
</script>
