<template>
  <div>
    <q-tabs>
      <q-route-tab slot="title" label="Raw Materials" icon="shopping basket" to="/inventory/raw-materials" />
      <q-route-tab slot="title" label="Packaging Materials" icon="thumb up" to="/inventory/packaging-materials" />
      <q-route-tab slot="title" label="Other Materials" icon="local drink" to="/inventory/other-materials" />
      <q-route-tab slot="title" label="Finished Goods" icon="local drink" to="/inventory/finished-goods" />
      <q-route-tab slot="title" label="Bad Orders" icon="local drink" to="/inventory/bad-orders" />
      <q-route-tab slot="title" label="Expired Goods" icon="local drink" to="/inventory/expired-goods" />
      <q-route-tab slot="title" label="Suppliers" icon="local drink" to="/inventory/suppliers" />
    </q-tabs>
    <router-view />
  </div>
</template>

<style>
</style>

<script>
import { QTabs, QBtn, QRouteTab } from 'quasar'
export default {
  created () {
    this.$store.dispatch('RawMaterials/loadRawMaterials')
    this.$store.dispatch('OtherMaterials/loadOtherMaterials')
    this.$store.dispatch('PackagingMaterials/loadPackagingMaterials')
    this.$store.dispatch('Suppliers/loadSuppliers')
    this.$store.dispatch('FinishedGoods/loadFinishedGoods')
  },
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
