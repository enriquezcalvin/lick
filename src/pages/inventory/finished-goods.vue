<template>
  <q-page padding class="docs-table">
    <q-table
      title="Finished Goods"
      :data="tableData"
      :columns="columns"
      row-key="name"
    >
      <div slot="top-right" slot-scope="props">
        <q-btn
          color="primary"
          size="sm"
          label="Add Goods"
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
            Add Goods!
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
                icon="fas fa-barcode"
              >
                <q-input v-model="item.SKU" float-label="Product SKU" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
                icon="fas fa-hashtag"
              >
                <q-input v-model="item.quantity" type="number" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
                icon="access_time"
                icon-color="negative"
              >
                <q-datetime v-model="item.bestBeforeDate" type="date" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.batch" type="number" float-label="Batch No." />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.shift" type="number" float-label="Shift No." />
              </q-field>
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
import { QTable, QTh, QTr, QTd, QTableColumns, QModal, QModalLayout, QSearch, QDatetime } from 'quasar'
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
    QDatetime
  },
  name: 'Finished-Products',
  data: () => ({
    item: {
      SKU: '',
      quantity: 0,
      bestBeforeDate: new Date(),
      batch: '',
      shift: ''
    },
    opened: false,
    search: true,
    columns: [
      {
        name: 'SKU',
        required: true,
        label: 'SKU',
        align: 'center',
        field: 'SKU',
        sortable: true
      },
      { name: 'description', label: 'Description', field: 'description', sortable: true },
      { name: 'quantity', label: 'Quantity', field: 'quantity', sortable: true },
      { name: 'bestBeforeDate', label: 'Best Before Date', field: 'bestBeforeDate' },
      { name: 'batch', label: 'Batch No.', field: 'batch' },
      { name: 'shift', label: 'Shift No.', field: 'shift' }
    ],
    tableData: [
      {
        SKU: '123456',
        description: 'This is an example product',
        quantity: 6,
        bestBeforeDate: new Date(),
        batch: 1,
        shift: 2
      }
    ]
  }),
  methods: {
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
