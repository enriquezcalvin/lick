<template>
  <q-page padding class="card-examples items-start">
    <div class="q-mb-md">
      <q-btn
        color="primary"
        icon="add"
        @click="opened = !opened">
        New Production Item
      </q-btn>
    </div>
    <div>
      <q-card inline class="q-ma-sm">
        <q-card-title>
          Lick Iced Tea
          <span slot="subtitle">Apple</span>
        </q-card-title>
        <q-card-separator />
        <q-card-actions>
          <q-field>
            <q-input value="" type="number" float-label="How many liters" :step="500"/>
          </q-field>
          <q-btn class="q-ml-sm">Make</q-btn>
        </q-card-actions>
      </q-card>
      <q-card inline class="q-ma-sm">
        <q-card-title>
          Lick Iced Tea
          <span slot="subtitle">Lemon</span>
        </q-card-title>
        <q-card-separator />
        <q-card-actions>
          <q-field>
            <q-input value="" type="number" float-label="How many liters"/>
          </q-field>
          <q-btn class="q-ml-sm">Make</q-btn>
        </q-card-actions>
      </q-card>
      <q-card inline class="q-ma-sm">
        <q-card-title>
          Lick Iced Tea
          <span slot="subtitle">Huckleberry</span>
        </q-card-title>
        <q-card-separator />
        <q-card-actions>
          <q-field>
            <q-input value="" type="number" float-label="How many liters"/>
          </q-field>
          <q-btn class="q-ml-sm">Make</q-btn>
        </q-card-actions>
      </q-card>
      <q-card inline class="q-ma-sm">
        <q-card-title>
          Lick Iced Tea
          <span slot="subtitle">Raspberry</span>
        </q-card-title>
        <q-card-separator />
        <q-card-actions>
          <q-field>
            <q-input value="" type="number" float-label="How many liters"/>
          </q-field>
          <q-btn class="q-ml-sm">Make</q-btn>
        </q-card-actions>
      </q-card>
      <q-card inline class="q-ma-sm">
        <q-card-media>
          <img src="statics/lick_peach.jpg">
          <q-card-title slot="overlay">
            Lick Iced Tea
            <span slot="subtitle">Peach</span>
          </q-card-title>
        </q-card-media>
        <q-card-separator />
        <q-card-actions>
          <q-field>
            <q-input value="" type="number" float-label="How many liters"/>
          </q-field>
          <q-btn class="q-ml-sm">Make</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '20vh'}">
      <q-stepper ref="stepper">
        <!-- Step: -->
        <q-step default title="Product Information" subtitle="Input Product Information">
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
        </q-step>

        <!-- Step: -->
        <q-step title="Raw Materials" subtitle="Input Raw Material Requirements">
          <p>
            this is the 2nd step for this thing
          </p>
        </q-step>

        <!-- Step: -->
        <q-step title="Packaging Materials" subtitle="Input Packaging Material Requirements">
          <p>
            this is the 3rd step for this thing
          </p>
        </q-step>

        <q-step title="Other Materials" subtitle="Input Other Material Requirements">
          <p>
            this is the 4th step for this thing
          </p>
        </q-step>
        <!--
          Optional.

          "Globally" available Stepper navigation which means
          that it will be visible regardless of the current step.
          If we'd put QStepperNavigation under a QStep then we'd
          be using it for that step only.
        -->
        <q-stepper-navigation>
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            label="Back"
          />
          <q-btn
            @click="$refs.stepper.next()"
            label="Next"
          />
        </q-stepper-navigation>
      </q-stepper>
    </q-modal>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
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
      opened: false,
      stars: 3,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  validations: {
    item: {
      code: {required},
      name: {required},
      item_sku: {required},
      quantity: {required}
    }
  }
}
</script>

<style lang="stylus">
.card-examples
  .q-card
    width 300px
  @media (max-width $breakpoint-xs-max)
    .q-card
      width 100%
</style>
