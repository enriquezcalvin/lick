<template>
  <q-page padding class="docs-table">
    <q-table
      title="Raw Materials"
      :data="tableData"
      :columns="columns"
      row-key="name"
      no-data-label="Loading your data! Please wait..."
    >
      <div slot="top-right" slot-scope="props">
        <div class="column">
          <q-btn
            color="primary"
            size="md"
            label="Add Materials"
            icon="add"
            class="q-mb-sm"
            @click="create_modal"
          />
          <div class="row">
            <q-btn color="secondary" icon="create" label="Edit" size="md" class="q-mr-sm" :disable="selected.length != 1" @click="edit_material"/>
            <q-btn color="negative" icon="delete" label="Delete" size="md" :disabled="selected.length != 1" @click="delete_materials"/>
          </div>
        </div>
      </div>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="code" :props="props">
            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
            {{ props.row.code }}
          </q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="SKU" :props="props">{{ props.row.SKU }}</q-td>
          <q-td key="totalQuantity" :props="props">{{ parseFloat(props.row.totalQuantity).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</q-td>
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
                  <q-td key="quantity" :props="props">{{ parseFloat(props.row.quantity).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</q-td>
                  <q-td key="unit" :props="props">{{ props.row.unit }}</q-td>
                  <q-td key="supplier" :props="props">{{ props.row.supplier }}</q-td>
                  <q-td key="vat" :props="props">{{ props.row.vat ? 'Vat Inc.' : 'Vat Ex.' }}</q-td>
                  <q-td key="purchaseDate" :props="props">{{ props.row.purchaseDate }}</q-td>
                  <q-td key="purchaseOrderNo" :props="props">{{ props.row.purchaseOrderNo }}</q-td>
                  <q-td key="unitCost" :props="props">{{ parseFloat(props.row.unitCost).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) }}</q-td>
                  <q-td key="totalAmount" :props="props">{{ parseFloat(props.row.totalAmount).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</q-td>
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
            {{action}} Raw Material!
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar class="justify-center" slot="footer">
          <q-btn
            label="Add!"
            @click="add_raw_materials"
            size="lg"
            class="q-mx-lg"
            color="positive"
            :loading="loading"
            :disabled="$v.$invalid"
            v-if="adding"
          />
          <q-btn
            label="Update!"
            @click="edit_raw_materials"
            size="lg"
            class="q-mx-lg"
            color="positive"
            :loading="loading"
            :disabled="$v.$invalid"
            v-else
          />
          <q-btn
            label="Cancel"
            @click="opened = false"
            size="lg"
            color="negative"
          />
        </q-toolbar>
        <div class="layout-padding row gutter-x-md">
          <div class="col-md-6 col-sm-12">
            <div class="q-mt-md">
              <q-field
                :error="$v.material.code.$error"
                error-label="This field is required!"
              >
                <q-input v-model="material.code" float-label="Item Code" @blur="$v.material.code.$touch" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
                :error="$v.material.name.$error"
                error-label="This field is required!"
              >
                <q-input v-model="material.name" float-label="Item Name" @blur="$v.material.name.$touch">
                  <q-autocomplete
                    @search="searchMaterial"
                    :min-characters="2"
                    @selected="selectedMaterialName"
                  />
                </q-input>
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
                :error="$v.material.quantity.$error"
                error-label="This field is required!"
              >
                <q-input v-model="material.quantity" type="number" lang="en-PH" float-label="Quantity" @blur="$v.material.quantity.$touch" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-select v-model="material.unit" filter :options="unitList" placeholder="Unit of Measurement">
                </q-select>
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
                <q-select v-model="material.supplier" filter :options="supplierList" placeholder="Supplier">
                </q-select>
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
                <q-input type="number" v-model="material.unitCost" float-label="Unit Cost" />
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
                <q-input type="number" readonly v-model="material.totalAmount" float-label="Total Amount" />
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
import { QTable, QTh, QTr, QTd, QTableColumns, QTooltip, QChip, QModal, QModalLayout, QSearch, QDatetime, QSelect, QToggle, QCheckbox, filter, QAutocomplete } from 'quasar'
import { required } from 'vuelidate/lib/validators'
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
    QCheckbox,
    QAutocomplete
  },
  name: 'InventoryRawMaterials',
  data: () => ({
    loading: false,
    opened: false,
    adding: false,
    action: '',
    unitList: [{label: 'kg', value: 'kg'},
      {label: 'g', value: 'g'},
      {label: 'l', value: 'l'},
      {label: 'ml', value: 'ml'},
      {label: 'pcs.', value: 'pcs.'},
      {label: 'boxes', value: 'boxes'},
      {label: 'pcks.', value: 'pcks.'},
      {label: 'cs.', value: 'cs.'}
    ],
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
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      SKU: ''
    },
    selected: [],
    columns: [
      { name: 'code', label: 'Item Code', align: 'left', field: 'code', sortable: true },
      { name: 'name', label: 'Item Name', align: 'left', field: 'name', sortable: true },
      { name: 'SKU', label: 'SKU', align: 'left', field: 'SKU', sortable: true },
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
  validations: {
    material: {
      code: {required},
      name: {required},
      quantity: {required}
    }
  },
  created () {
    //
  },
  computed: {
    tableData () {
      return this.$store.getters['RawMaterials/getRawMaterials']
    },
    supplierList () {
      return this.$store.getters['Suppliers/getSupplierList']
    },
    minimizedData () {
      return this.tableData.map(item => {
        return {
          label: item.name,
          code: item.code,
          value: item.name
        }
      })
    }
  },
  watch: {
    'material.code': function (val) {
      this.material.SKU = val + '-' + this.material.supplier + '-' + this.material.lot
    },
    'material.supplier': function (val) {
      this.material.SKU = this.material.code + '-' + val + '-' + this.material.lot
    },
    'material.lot': function (val) {
      this.material.SKU = this.material.code + '-' + this.material.supplier + '-' + val
    },
    'material.unitCost': function (val) {
      this.material.totalAmount = val * this.material.quantity
      if (this.material.vat) {
        this.material.totalAmount *= 1.12
      }
      this.material.totalAmount = this.material.totalAmount.toFixed(2)
    },
    'material.quantity': function (val) {
      this.material.totalAmount = val * this.material.unitCost
      if (this.material.vat) {
        this.material.totalAmount *= 1.12
      }
      this.material.totalAmount = this.material.totalAmount.toFixed(2)
      console.log(parseFloat(this.material.quantity).toLocaleString('en-PH'))
      this.material.quantity = parseFloat(this.material.quantity).toLocaleString('en-PH')
    },
    'material.vat': function (val) {
      this.material.totalAmount = this.material.quantity * this.material.unitCost
      if (val) {
        this.material.totalAmount *= 1.12
      }
      this.material.totalAmount = this.material.totalAmount.toFixed(2)
    }
  },
  methods: {
    create_modal: function () {
      this.opened = true
      this.action = 'Add'
      this.adding = true
      this.material = {
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
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        SKU: ''
      }
    },
    searchSupplier: function (terms, done) {
      done(filter(terms, {field: 'label', list: this.supplierList}))
    },
    selectedSupplierName: function (item) {
      this.material.supplier = `${item.value}`
    },
    searchMaterial: function (terms, done) {
      done(filter(terms, {field: 'value', list: this.minimizedData}))
    },
    selectedMaterialName: function (item) {
      this.material.code = `${item.code}`
    },
    edit_material: function () {
      this.material = this.selected[0]
      this.opened = true
      this.adding = false
      this.action = 'Edit'
    },
    edit_raw_materials: function () {
      this.loading = true
      this.$store.dispatch('RawMaterials/updateRawMaterial', this.material)
        .then((data) => {
          this.selected = []
          this.opened = false
          this.loading = false
          this.$q.notify({
            message: `Material has been Updated!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            type: 'positive',
            color: 'positive',
            textColor: 'black'
          })
          this.material = {
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
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            SKU: ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    add_raw_materials: function () {
      this.loading = true
      this.$store.dispatch('RawMaterials/createRawMaterial', this.material)
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
          this.material = {
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
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            SKU: ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    delete_materials: function () {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Are you sure you want to delete this material?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        this.$store.dispatch('RawMaterials/deleteRawMaterial', this.selected[0].id)
          .then((data) => {
            this.selected = []
            this.$q.notify({
              message: `Selected Material has been Deleted!`,
              timeout: 3000,
              type: 'negative',
              color: 'negative',
              textColor: 'black'
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }).catch(() => {
        this.$q.notify({
          message: `Delete Aborted`,
          timeout: 3000,
          color: 'secondary',
          textColor: 'black'
        })
      })
    }
  }
}
</script>
