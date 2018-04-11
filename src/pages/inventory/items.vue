<template>
  <q-page padding class="docs-table">
    <q-table
      title="Products"
      :data="tableData"
      :columns="columns"
      row-key="name"
    >
      <div slot="top-right" slot-scope="props">
        <q-btn
          color="primary"
          size="sm"
          label="Add Products"
          icon="add"
          class="q-mb-sm"
          @click="opened = true"
        />
      </div>
    </q-table>
    <q-modal v-model="opened" :content-css="{minWidth: '30vw', minHeight: '50vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Add Product!
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar slot="footer">
          <q-btn 
            label="Cancel"
            @click="opened = false"
            size="md"
            color="negative"
          />
          <q-btn
            label="Add!"
            @click="add_finished_goods"
            size="md"
            class="q-mx-md"
            color="positive"
          />
        </q-toolbar>
        <div class="layout-padding row">
          <div class="col-12">
            <div>
              <q-field
              >
                <q-select
                  v-model="item.type"
                  :options="typeOptions"
                  float-label="Product Type"
                />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
                icon="fas fa-barcode"
              >
                <q-input v-model="item.SKU" float-label="Product SKU" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.description" float-label="Product Description" />
              </q-field>
            </div>
            <div class="q-mt-lg" v-if="item.recipe">
              <q-field
                label="Recipe"
              />
            </div>
          </div>
        </div>
        
      </q-modal-layout>
    </q-modal>
  </q-page>
  
</template>

<style>
</style>

<script>
import { QTable, QTh,QTr, QTd, QTableColumns, QModal, QModalLayout, QSearch, QDatetime, QSelect } from 'quasar'
export default {
  components: {
    QTable,
    QTh,
    QTr,
    QTd,
    QTableColumns,
    QModal,
    QModalLayout,
    QSearch,
    QDatetime,
    QSelect
  },
  name: 'Item',
  data: () => ({
    item: {
      SKU: '',
      description: '',
      type: '',
      recipe: false,
      cost: 10
    },
    typeOptions: [
      {
        label: 'Own',
        value: 'Own'
      },
      {
        label: 'Resell',
        value: 'Resell'
      }
    ],
    opened: false,
    search: true,
    columns: [
      { name: 'type', required: true, label: 'Type', align: 'center', field: 'type', sortable: true },
      { name: 'SKU', required: true, label: 'SKU', align: 'center', field: 'SKU', sortable: true },
      { name: 'description', label: 'Description', field: 'description', align: 'center', sortable: true },
    ],
    tableData: [
      {
        type: 'Own',
        SKU: '123456',
        description: 'This is an example product',
      },
    ]
  }),
  methods: {
    change_type: function () {
      console.log(this.item.type)
      this.item.recipe = this.item.type === 'Own'
    },
    add_finished_goods: function () {

      this.tableData.push(this.item)
      
      this.opened = false

      this.$q.notify({
      // only required parameter is the message:
      message: `New Item has been Added!`,

      /*
      * All parameters below are optional:
      */

      timeout: 3000, // in milliseconds; 0 means no timeout

      // "type" adds a color and icon,
      // so you don't need to specify them.
      // Available values: 'positive', 'negative', 'warning', 'info'
      type: 'positive',

      color: 'positive',
      textColor: 'black'
      })
    }
  }
}
</script>
