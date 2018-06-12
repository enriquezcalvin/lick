<template>
  <q-page padding class="docs-table">
    <q-table
      title="Suppliers"
      :data="tableData"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      no-data-label="Loading your data! Please wait..."
    >
      <div slot="top-right" slot-scope="props">
        <div class="column">
          <q-btn
            color="primary"
            size="md"
            label="Add Suppliers"
            icon="add"
            class="q-mb-sm"
            @click="opened = true"
          />
          <div class="row">
            <q-btn color="secondary" icon="create" label="Edit" size="md" class="q-mr-sm" :disable="selected.length != 1"/>
            <q-btn color="negative" icon="delete" label="Delete" size="md" :disabled="selected.length != 1" @click="delete_suppliers"/>
          </div>
        </div>
      </div>
    </q-table>
    <q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '40vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Add Supplier!
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
            @click="add_suppliers"
            size="md"
            class="q-mx-md"
            color="positive"
            :loading="loading"
            :disabled="$v.$invalid"
          />
        </q-toolbar>
        <div class="layout-padding row gutter-x-md">
          <div class="col-md-6 col-sm-12">
            <div class="q-mt-md">
              <q-field
                :error="$v.supplier.name.$error"
                error-label="This field is required!"
              >
                <q-input v-model="supplier.name" float-label="Name" @blur="$v.supplier.name.$touch" />
              </q-field>
            </div>
            <div class="q-mt-md q-ml-md">
              <q-field
              >
                <div v-for="(item, index) in supplier.addresses" :key="index">
                  <q-input v-model="item.address" float-label="Address" />
                </div>
              </q-field>
              <q-btn class="q-mt-sm" color="positive" label="Add Address" v-if="supplier.addresses.length < 2" @click="add_supplier_address" />
              <q-btn class="q-mt-sm" color="negative" label="Remove Address" v-if="supplier.addresses.length > 1" @click="remove_supplier_address" />
            </div>
          </div>
          <div class="col-md-6 col-sm-12 ">
            <div class="q-mt-md">
              <q-field
              >
                <div v-for="(item, index) in supplier.contacts" :key="index">
                  <q-input v-model="item.contact" float-label="Contact Person" />
                </div>
              </q-field>
              <q-btn class="q-mt-sm" color="positive" label="Add Contact Person" v-if="supplier.contacts.length < 4" @click="add_supplier_contact" />
              <q-btn class="q-mt-sm" color="negative" label="Remove Contact Person" v-if="supplier.contacts.length > 1" @click="remove_supplier_contact" />
            </div>
            <div class="q-mt-md">
              <q-field
              >
                <div v-for="(item, index) in supplier.numbers" :key="index">
                  <q-input v-model="item.number" float-label="Number" @blur="check_number_format(index)"/>
                </div>
              </q-field>
              <q-btn class="q-mt-sm" color="positive" label="Add Number" v-if="supplier.numbers.length" @click="add_supplier_number" />
              <q-btn class="q-mt-sm" color="negative" label="Remove Number" v-if="supplier.numbers.length > 1" @click="remove_supplier_number" />
            </div>
            <div class="q-mt-md">
              <q-field
                :error="$v.supplier.email.$error"
                error-label="This is not correct email format!"
              >
                <q-input v-model="supplier.email" float-label="Email" @blur="$v.supplier.email.$touch" />
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
import { QTable, QTh, QTr, QTd, QTableColumns, QTooltip, QChip, QModal, QModalLayout, QSearch, QDatetime, QSelect, QToggle, QCheckbox, QAutocomplete } from 'quasar'
import { required, email } from 'vuelidate/lib/validators'
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
  name: 'InventorySuppliers',
  data: () => ({
    loading: false,
    opened: false,
    supplier: {
      name: '',
      addresses: [{ address: '' }],
      contacts: [{ contact: '' }],
      numbers: [{ number: '' }],
      emails: [{ email: '' }]
    },
    selected: [],
    columns: [
      { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
      { name: 'address', label: 'Address', align: 'left', field: 'address', sortable: true },
      { name: 'contact', label: 'Contact', align: 'left', field: 'contact', sortable: true },
      { name: 'number', label: 'Number', align: 'left', field: 'number', sortable: true },
      { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true }
    ]
  }),
  validations: {
    supplier: {
      contact: {required},
      name: {required},
      email: {email}
    }
  },
  created () {
    // this.$store.dispatch('RawMaterials/loadDummy')
  },
  computed: {
    tableData () {
      return this.$store.getters['Suppliers/getSuppliers']
    }
  },
  methods: {
    check_number_format: function (key) {
      if (this.supplier.numbers[key].number.length === 7) {
        console.log(key)
        this.supplier.numbers[key].number = '02-' + this.supplier.numbers[key].number
      } else if (this.supplier.numbers[key].number.length === 10 && this.supplier.numbers[key].number[0] === '9') {
        console.log(key)
        this.supplier.numbers[key].number = '0' + this.supplier.numbers[key].number
        this.supplier.numbers[key].number = this.supplier.numbers[key].number.substr(0, 4) + '-' + this.supplier.numbers[key].number.substr(4)
      } else if (this.supplier.numbers[key].number.length === 11) {
        console.log(key)
        this.supplier.numbers[key].number = '' + this.supplier.numbers[key].number
        this.supplier.numbers[key].number = this.supplier.numbers[key].number.substr(0, 4) + '-' + this.supplier.numbers[key].number.substr(4)
      } else if (this.supplier.numbers[key].number.length === 12) {
        console.log(key)
        this.supplier.numbers[key].number = '' + this.supplier.numbers[key].number
        this.supplier.numbers[key].number = '0' + this.supplier.numbers[key].number.substr(2, 3) + '-' + this.supplier.numbers[key].number.substr(5)
      } else if (this.supplier.numbers[key].number.length === 13) {
        console.log(key)
        this.supplier.numbers[key].number = '' + this.supplier.numbers[key].number
        this.supplier.numbers[key].number = '0' + this.supplier.numbers[key].number.substr(3, 3) + '-' + this.supplier.numbers[key].number.substr(6)
      }
    },
    add_supplier_address: function () {
      this.supplier.addresses.push({ address: '' })
    },
    remove_supplier_address: function () {
      this.supplier.addresses.pop()
    },
    add_supplier_contact: function () {
      this.supplier.contacts.push({ contact: '' })
    },
    remove_supplier_contact: function () {
      this.supplier.contacts.pop()
    },
    add_supplier_number: function () {
      this.supplier.numbers.push({ number: '' })
    },
    remove_supplier_number: function () {
      this.supplier.numbers.pop()
    },
    add_suppliers: function () {
      this.loading = true
      this.$store.dispatch('Suppliers/createSupplier', this.supplier)
        .then((data) => {
          this.opened = false
          this.loading = false
          this.$q.notify({
            message: `New Supplier has been Added!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            type: 'positive',
            color: 'positive',
            textColor: 'black'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    delete_suppliers: function () {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Are you sure you want to delete this supplier?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        console.log('came here')
        this.$store.dispatch('Suppliers/deleteSupplier', this.selected[0].id)
          .then((data) => {
            this.$q.notify({
              message: `Selected Supplier has been Deleted!`,
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
