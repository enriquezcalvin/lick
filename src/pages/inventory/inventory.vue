<template>
  <q-page padding class="docs-table">
    <q-table
      title="Raw Materials"
      :data="tableData"
      :columns="columns"
      row-key="name"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="desc" :props="props">
          <span class="text-italic">{{ props.row.name }}</span>
          <q-tooltip>I'd like to eat "{{ props.row.name }}"</q-tooltip>
        </q-td>
        <q-td key="calories" :props="props">
          <div class="row items-center justify-between no-wrap">
            <q-btn size="sm" round dense color="secondary" icon="remove" @click="props.row.calories--" class="q-mr-xs" />
            <q-btn size="sm" round dense color="tertiary" icon="add" @click="props.row.calories++" class="q-mr-sm" />
            <div>{{ props.row.calories }}</div>
          </div>
        </q-td>
        <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
        <q-td key="carbs" :props="props">
          <q-chip small square color="amber">{{ props.row.carbs }}</q-chip>
        </q-td>
        <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
        <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
        <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
        <q-td key="iron" :props="props">
          {{ props.row.iron }}
        </q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>

<style>
</style>

<script>
import { QTable, QTh, QTr, QTd, QTableColumns } from 'quasar'
export default {
  components: {
    QTable,
    QTh,
    QTr,
    QTd,
    QTableColumns
  },
  name: 'Finished Products',
  data: () => ({
    columns: [
      {
        name: 'desc',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: 'name',
        sortable: true
      },
      { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
      { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
      { name: 'protein', label: 'Protein (g)', field: 'protein' },
      { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
      { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ],
    tableData: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      }
    ]
  })
}
</script>
