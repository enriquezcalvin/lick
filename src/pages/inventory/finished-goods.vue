<template>
  <q-page padding class="docs-table">
    <q-table
      title="Finished Goods"
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
            label="Add Finished Goods"
            icon="add"
            class="q-mb-sm"
            @click="create_modal"
          />
          <div class="row">
            <q-btn color="secondary" icon="create" label="Edit" size="md" class="q-mr-sm" :disable="selected.length != 1" @click="edit_goods"/>
            <q-btn color="negative" icon="delete" label="Delete" size="md" :disabled="selected.length != 1" @click="delete_goods"/>
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
          <q-td key="item_sku" :props="props">{{ props.row.item_sku }}</q-td>
          <q-td key="box_sku" :props="props">{{ props.row.box_sku }}</q-td>
          <q-td key="unit" :props="props">{{ props.row.unit }}</q-td>
          <q-td key="unitCost" :props="props">{{ props.row.unitCost }}</q-td>
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
                  <q-td key="batch" :props="props">{{ props.row.batch }}</q-td>
                  <q-td key="shift" :props="props">{{ props.row.shift }}</q-td>
                  <q-td key="quantity" :props="props">{{ parseFloat(props.row.quantity).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</q-td>
                  <q-td key="supplier" :props="props">{{ props.row.supplier }}</q-td>
                  <q-td key="deliveryDate" :props="props">{{ props.row.deliveryDate }}</q-td>
                  <q-td key="totalAmount" :props="props">{{ parseFloat(props.row.totalAmount).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</q-td>
                  <q-td key="expiryDate" :props="props">{{ props.row.expiryDate }}</q-td>
                </q-tr>
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '78vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            {{action}} Finished Goods!
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
            @click="add_goods"
            size="md"
            class="q-mx-md"
            color="positive"
            :loading="loading"
            :disabled="$v.$invalid"
            v-if="adding"
          />
          <q-btn
            label="Update!"
            @click="edit_goods_modal"
            size="md"
            class="q-mx-md"
            color="positive"
            :loading="loading"
            :disabled="$v.$invalid"
            v-else
          />
        </q-toolbar>
        <div class="layout-padding row gutter-x-md">
          <div class="col-md-6 col-sm-12">
            <div class="q-mt-md">
              <q-field
                :error="$v.item.code.$error"
                error-label="This field is required!"
              >
                <q-input v-model="item.code" float-label="Code" @blur="$v.item.code.$touch" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
                :error="$v.item.name.$error"
                error-label="This field is required!"
              >
                <q-input v-model="item.name" float-label="Name" @blur="$v.item.name.$touch">
                  <q-autocomplete
                    @search="searchGood"
                    :min-characters="2"
                    @selected="selectedGoodName"
                  />
                </q-input>
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.item_sku" float-label="Item Barcode" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.box_sku" float-label="Case Barcode" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.batch" float-label="Batch #" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.shift" float-label="Shift #" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.lot" float-label="Lot #" />
              </q-field>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 ">
            <div class="q-mt-md">
              <q-field
              >
                <q-datetime v-model="item.deliveryDate" type="date" float-label="Date of Delivery"/>
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
                :error="$v.item.quantity.$error"
                error-label="This field is required!"
              >
                <q-input v-model="item.quantity" float-label="Quantity" @blur="$v.item.quantity.$touch" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.unit" float-label="Unit of Measurement" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-datetime v-model="item.expiryDate" type="date" float-label="Expiry Date" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input type="number" v-model="item.unitCost" float-label="Unit Cost" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input type="number" readonly v-model="item.totalAmount" float-label="Total Amount" />
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-select v-model="item.supplier" filter :options="supplierList" placeholder="Supplier">
                </q-select>
              </q-field>
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <q-input v-model="item.description" type="textarea" float-label="Description"/>
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
import { filter } from 'quasar'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'InventoryFinishedGoods',
  data: () => ({
    loading: false,
    opened: false,
    adding: false,
    action: '',
    item: {
      code: '',
      name: '',
      item_sku: '',
      box_sku: '',
      lot: '',
      batch: '',
      shift: '',
      quantity: 0,
      unit: '',
      description: '',
      supplier: '',
      deliveryDate: Date.now(),
      expiryDate: Date.now(),
      unitCost: 0.0,
      totalAmount: 0,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      image_path: ''
    },
    selected: [],
    columns: [
      { name: 'code', label: 'Item Code', align: 'left', field: 'code', sortable: true },
      { name: 'name', label: 'Item Name', align: 'left', field: 'name', sortable: true },
      { name: 'item_sku', label: 'Item SKU', align: 'left', field: 'item_sku', sortable: true },
      { name: 'box_sku', label: 'Box SKU', align: 'left', field: 'box_sku', sortable: true },
      { name: 'unit', label: 'Unit of Measurement', align: 'left', field: 'unit', sortable: true },
      { name: 'unitCost', label: 'Unit Cost', align: 'left', field: 'unitCost', sortable: true },
      { name: 'totalQuantity', label: 'Total Quantity', align: 'left', field: 'total', sortable: true }
    ],
    columns2: [
      { name: 'lot', label: 'Lot #', align: 'center', field: 'lot', sortable: true },
      { name: 'batch', label: 'Batch #', align: 'center', field: 'batch', sortable: true },
      { name: 'shift', label: 'Shift #', align: 'center', field: 'shift', sortable: true },
      { name: 'quantity', label: 'Quantity', align: 'center', field: 'quantity', sortable: true },
      { name: 'supplier', label: 'Supplier', align: 'center', field: 'supplier', sortable: true },
      { name: 'deliveryDate', label: 'Date of delivery', align: 'center', field: 'deliveryDate', sortable: true },
      { name: 'totalAmount', label: 'Total Amount', align: 'center', field: 'totalAmount', sortable: true },
      { name: 'expiryDate', label: 'Expiry Date', align: 'center', field: 'expiryDate', sortable: true }

    ]
  }),
  validations: {
    item: {
      code: {required},
      name: {required},
      item_sku: {required},
      quantity: {required}
    }
  },
  created () {
    //
  },
  computed: {
    tableData () {
      return this.$store.getters['FinishedGoods/getFinishedGoods']
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
    'item.unitCost': function (val) {
      this.item.totalAmount = val * this.item.quantity
      if (this.item.vat) {
        this.item.totalAmount *= 1.12
      }
      this.item.totalAmount = this.item.totalAmount.toFixed(2)
    },
    'item.quantity': function (val) {
      this.item.totalAmount = val * this.item.unitCost
      if (this.item.vat) {
        this.item.totalAmount *= 1.12
      }
      this.item.totalAmount = this.item.totalAmount.toFixed(2)
    }
  },
  methods: {
    create_modal: function () {
      this.opened = true
      this.action = 'Add'
      this.adding = true
      this.item = {
        code: '',
        name: '',
        item_sku: '',
        box_sku: '',
        lot: '',
        batch: '',
        shift: '',
        quantity: 0,
        unit: '',
        description: '',
        supplier: '',
        deliveryDate: Date.now(),
        expiryDate: Date.now(),
        unitCost: 0.0,
        totalAmount: 0,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        image_path: ''
      }
    },
    searchSupplier: function (terms, done) {
      done(filter(terms, {field: 'label', list: this.supplierList}))
    },
    selectedSupplierName: function (item) {
      this.material.supplier = `${item.value}`
    },
    searchGood: function (terms, done) {
      done(filter(terms, {field: 'value', list: this.minimizedData}))
    },
    selectedGoodName: function (item) {
      this.material.code = `${item.code}`
    },
    edit_goods_modal: function () {
      this.item = this.selected[0]
      this.opened = true
      this.adding = false
      this.action = 'Edit'
    },
    edit_goods: function () {
      this.loading = true
      this.$store.dispatch('FinishedGoods/updateRawMaterial', this.item)
        .then((data) => {
          this.selected = []
          this.opened = false
          this.loading = false
          this.$q.notify({
            message: `Item has been Updated!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            type: 'positive',
            color: 'positive',
            textColor: 'black'
          })
          this.item = {
            code: '',
            name: '',
            item_sku: '',
            box_sku: '',
            lot: '',
            batch: '',
            shift: '',
            quantity: 0,
            unit: '',
            description: '',
            supplier: '',
            deliveryDate: Date.now(),
            expiryDate: Date.now(),
            unitCost: 0.0,
            totalAmount: 0,
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            image_path: ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    add_goods: function () {
      this.loading = true
      this.$store.dispatch('FinishedGoods/createFinishedGoods', this.item)
        .then((data) => {
          this.opened = false
          this.loading = false
          this.$q.notify({
            message: `New Item has been Added!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            type: 'positive',
            color: 'positive',
            textColor: 'black'
          })
          this.item = {
            code: '',
            name: '',
            item_sku: '',
            box_sku: '',
            lot: '',
            batch: '',
            shift: '',
            quantity: 0,
            unit: '',
            description: '',
            supplier: '',
            deliveryDate: Date.now(),
            expiryDate: Date.now(),
            unitCost: 0.0,
            totalAmount: 0,
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            image_path: ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    delete_goods: function () {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Are you sure you want to delete this item?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        this.$store.dispatch('FinishedGoods/deleteFinishedGoods', this.selected[0].id)
          .then((data) => {
            this.selected = []
            this.$q.notify({
              message: `Selected Item has been Deleted!`,
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
