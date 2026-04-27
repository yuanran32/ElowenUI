import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import Table from '../src/table.vue'
import type { TableColumn, TableSortState } from '../src/table'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'score', title: 'Score', sortable: true, align: 'right' as const },
  {
    key: 'status',
    title: 'Status',
    formatter: (row) => (row.active ? 'Active' : 'Paused'),
  },
]

const data = [
  { id: 1, name: 'Gamma', score: 83, active: true },
  { id: 2, name: 'Alpha', score: 97, active: false },
  { id: 3, name: 'Beta', score: 91, active: true },
]

describe('MyTable', () => {
  it('sorts rows when clicking sortable header', async () => {
    const wrapper = mount(Table, {
      props: {
        data,
        columns,
        rowKey: 'id',
      },
    })

    const getFirstScore = () => wrapper.findAll('tbody tr')[0].findAll('td')[1].text()

    expect(getFirstScore()).toBe('83')

    await wrapper.get('.my-table__sorter').trigger('click')
    expect(getFirstScore()).toBe('83')

    await wrapper.get('.my-table__sorter').trigger('click')
    expect(getFirstScore()).toBe('97')
  })

  it('supports controlled row selection', async () => {
    const Demo = defineComponent({
      components: { Table },
      setup() {
        const selectedRowKeys = ref<number[]>([])
        return { columns, data, selectedRowKeys }
      },
      template: `
        <Table
          v-model:selected-row-keys="selectedRowKeys"
          :columns="columns"
          :data="data"
          row-key="id"
          selectable
        />
      `,
    })

    const wrapper = mount(Demo)
    const checkboxes = wrapper.findAll('input[type="checkbox"]')

    await checkboxes[1].setValue(true)
    expect(wrapper.vm.selectedRowKeys).toEqual([1])

    await checkboxes[0].setValue(true)
    expect(wrapper.vm.selectedRowKeys).toEqual([1, 2, 3])
  })

  it('renders custom cell slots and highlights current row', async () => {
    const wrapper = mount(Table, {
      props: {
        data,
        columns,
        rowKey: 'id',
        highlightCurrentRow: true,
      },
      slots: {
        'cell-name': ({ row }) => `Project: ${row.name}`,
      },
    })

    expect(wrapper.text()).toContain('Project: Gamma')

    await wrapper.findAll('tbody tr')[1].trigger('click')
    expect(wrapper.findAll('tbody tr')[1].classes()).toContain('is-current')
  })

  it('renders empty state', () => {
    const wrapper = mount(Table, {
      props: {
        data: [],
        columns,
        emptyText: 'Nothing here',
      },
    })

    expect(wrapper.text()).toContain('Nothing here')
  })

  it('supports server-side controlled sorting without reordering local data', async () => {
    const Demo = defineComponent({
      components: { Table },
      setup() {
        const sortState = ref<TableSortState>({
          key: '',
          order: null,
        })

        return { columns, data, sortState }
      },
      template: `
        <Table
          v-model:sort-state="sortState"
          :columns="columns"
          :data="data"
          sort-mode="server"
          row-key="id"
        />
      `,
    })

    const wrapper = mount(Demo)
    const getFirstScore = () => wrapper.findAll('tbody tr')[0].findAll('td')[1].text()

    await wrapper.get('.my-table__sorter').trigger('click')

    expect(wrapper.vm.sortState).toEqual({
      column: columns[1],
      key: 'score',
      order: 'ascending',
    })
    expect(getFirstScore()).toBe('83')
  })

  it('renders fixed columns, hidden columns, and loading state', () => {
    const wrapper = mount(Table, {
      props: {
        data,
        columns: [
          { key: 'name', title: 'Name', width: 180, fixed: 'left' as const },
          { key: 'score', title: 'Score', width: 120, sortable: true, fixed: 'right' as const },
          { key: 'status', title: 'Status', hidden: true },
        ],
        rowKey: 'id',
        selectable: true,
        selectionFixed: true,
        loading: true,
      },
    })

    expect(wrapper.findAll('th')).toHaveLength(3)
    expect(wrapper.find('.my-table__loading').text()).toContain('Loading...')
    expect(wrapper.find('.is-fixed-left').exists()).toBe(true)
    expect(wrapper.find('.is-fixed-right').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Status')
  })
})
