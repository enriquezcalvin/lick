<template>
  <q-page padding class="docs-table">
    <q-table
      title="Packaging Materials"
      :data="tableData"
      :columns="columns"
      row-key="name"
      no-data-label="Loading your data! Please wait..."
    >
      <div slot="top-right" slot-scope="props">
        <q-btn
          color="primary"
          size="sm"
          label="Add Materials"
          icon="add"
          class="q-mb-sm"
          @click="opened = true"
        />
      </div>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="code" :props="props">
            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
            {{ props.row.code }}
          </q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="totalQuantity" :props="props">{{ props.row.totalQuantity }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-table
              :data="props.row.items"
              :columns="columns2"
              selection="multiple"
              :selected.sync="selected"
              row-key="id"
              no-data-label="Loading your data! Please wait..."
            >
              <q-tr slot="header" slot-scope="props">
                <q-th auto-width>
                  <q-checkbox
                    v-if="props.multipleSelect"
                    v-model="props.selected"
                    indeterminate-value="some"
                  />
                </q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
              <template slot="body" slot-scope="props">
                <q-tr :props="props">
                  <q-td auto-width>
                    <q-checkbox color="primary" v-model="props.selected" />
                  </q-td>
                  <q-td key="lot" :props="props">{{ props.row.lot }}</q-td>
                  <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
                  <q-td key="unit" :props="props">{{ props.row.unit }}</q-td>
                  <q-td key="supplier" :props="props">{{ props.row.supplier }}</q-td>
                  <q-td key="vat" :props="props">{{ props.row.vat }}</q-td>
                  <q-td key="purchaseDate" :props="props">{{ props.row.purchaseDate }}</q-td>
                  <q-td key="purchaseOrderNo" :props="props">{{ props.row.purchaseOrderNo }}</q-td>
                  <q-td key="unitCost" :props="props">{{ props.row.unitCost }}</q-td>
                  <q-td key="totalAmount" :props="props">{{ props.row.totalAmount }}</q-td>
                </q-tr>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '65vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Add Packaging Material!
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
            @click="add_packaging_materials"
            size="md"
            class="q-mx-md"
            color="positive"
            :loading="loading"
          />
        </q-toolbar>
        <div class="layout-padding row gutter-x-md">
          <div class="col-md-6 col-sm-12">
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.code" float-label="Code" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.name" float-label="Name" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.lot" float-label="Lot #" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.quantity" float-label="Quantity" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.unit" float-label="Unit of Measurement" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.description" type="textarea" float-label="Description"/>
              </q-field>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 ">
            <div class="q-mt-md">
              <q-field
              >
                <q-datetime v-model="material.purchaseDate" type="date" float-label="Date of Purchase"/>
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.supplier" float-label="supplier (might need to change to select)" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.SKU" float-label="SKU" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.purchaseOrderNo" float-label="P.O. #" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="material.unitCost" float-label="Unit Cost" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-toggle v-model="material.vat" val="vat" label="VAT" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input readonly v-model="material.totalAmount" float-label="Total Amount" />
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
import { QTable, QTh, QTr, QTd, QTableColumns, QTooltip, QChip, QModal, QModalLayout, QSearch, QDatetime, QSelect, QToggle, QCheckbox } from 'quasar'
export default {
  components: {
    QTable,
    QTh,
    QTr,
    QTd,
    QTableColumns,
    QTooltip,
    QChip,
    QModal,
    QModalLayout,
    QSearch,
    QDatetime,
    QSelect,
    QToggle,
    QCheckbox
  },
  name: 'FinishedProducts',
  data: () => ({
    loading: false,
    opened: false,
    material: {
      code: '',
      name: '',
      lot: '',
      quantity: 0,
      unit: '',
      description: '',
      supplier: '',
      vat: true,
      purchaseDate: Date.now(),
      purchaseOrderNo: '',
      unitCost: 0.0,
      totalAmount: 0,
      date_created: Date.now(),
      date_updated: Date.now(),
      SKU: ''
    },
    selected: [],
    columns: [
      { name: 'code', label: 'Item Code', align: 'left', field: 'code', sortable: true },
      { name: 'name', label: 'Item Name', align: 'left', field: 'name', sortable: true },
      { name: 'totalQuantity', label: 'Total Quantity', align: 'left', field: 'total', sortable: true }
    ],
    columns2: [
      { name: 'lot', label: 'Lot #', align: 'center', field: 'lot', sortable: true },
      { name: 'quantity', label: 'Quantity', align: 'center', field: 'quantity', sortable: true },
      { name: 'unit', label: 'Unit of Measurement', align: 'center', field: 'unit', sortable: true },
      { name: 'supplier', label: 'Supplier', align: 'center', field: 'supplier', sortable: true },
      { name: 'vat', label: 'VAT', align: 'center', field: 'vat', sortable: true },
      { name: 'purchaseDate', label: 'Date of Purchase', align: 'center', field: 'purchaseDate', sortable: true },
      { name: 'purchaseOrderNo', label: 'P.O. #', align: 'center', field: 'purchaseOrderNo', sortable: true },
      { name: 'unitCost', label: 'Unit Cost', align: 'center', field: 'unitCost', sortable: true },
      { name: 'totalAmount', label: 'Total Amount', align: 'center', field: 'totalAmount', sortable: true }
    ]
  }),
  created () {
    this.$store.dispatch('PackagingMaterials/loadPackagingMaterials')
    // this.$store.dispatch('PackagingMaterials/loadDummy')
  },
  computed: {
    tableData () {
      return this.$store.getters['PackagingMaterials/getPackagingMaterials']
    }
  },
  watch: {
    'material.unitCost': function (val) {
      this.material.totalAmount = val * this.material.quantity
    },
    'material.quantity': function (val) {
      this.material.totalAmount = val * this.material.unitCost
    }
  },
  methods: {
    add_packaging_materials: function () {
      this.loading = true
      this.$store.dispatch('PackagingMaterials/createPackagingMaterial', this.material)
        .then((data) => {
          this.opened = false
          this.loading = false
          this.$q.notify({
            message: `New Material has been Added!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            type: 'positive',
            color: 'positive',
            textColor: 'black'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
