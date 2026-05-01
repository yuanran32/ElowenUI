import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ProTable from '../src/pro-table.vue'
import type { TableColumn } from '../../table'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'score', title: 'Score', sortable: true },
]

describe('MyProTable', () => {
  it('loads remote data on mount', async () => {
    const request = vi.fn().mockResolvedValue({
      data: [{ id: 1, name: 'Elowen', score: 90 }],
      total: 1,
    })
    const wrapper = mount(ProTable, {
      props: {
        columns,
        request,
      },
    })

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Elowen')
    })

    expect(request).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sorter: undefined,
      query: {},
    })
    expect(wrapper.text()).toContain('Total 1')
  })

  it('reloads with sort and pagination params', async () => {
    const request = vi.fn()
      .mockResolvedValueOnce({ data: [{ id: 1, name: 'A', score: 80 }], total: 20 })
      .mockResolvedValueOnce({ data: [{ id: 2, name: 'B', score: 90 }], total: 20 })
      .mockResolvedValueOnce({ data: [{ id: 3, name: 'C', score: 70 }], total: 20 })

    const wrapper = mount(ProTable, {
      props: {
        columns,
        request,
        pageSize: 10,
      },
    })

    await vi.waitFor(() => expect(wrapper.text()).toContain('A'))
    await wrapper.get('.my-table__sorter').trigger('click')
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2))

    expect(request.mock.calls[1][0]).toMatchObject({
      page: 1,
      sorter: { key: 'score', order: 'ascending' },
    })

    await wrapper.findAll('.my-pro-table__pager-actions .my-button')[1].trigger('click')
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(3))
    expect(request.mock.calls[2][0]).toMatchObject({ page: 2 })
  })

  it('renders error slot and exposes reload', async () => {
    const request = vi.fn()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce({ data: [{ id: 1, name: 'Recovered', score: 99 }], total: 1 })

    const wrapper = mount(ProTable, {
      props: {
        columns,
        request,
      },
      slots: {
        error: '<div class="custom-error">Custom error</div>',
      },
    })

    await vi.waitFor(() => expect(wrapper.find('.custom-error').exists()).toBe(true))

    await wrapper.vm.reload()
    await vi.waitFor(() => expect(wrapper.text()).toContain('Recovered'))
  })

  it('keeps the latest request result when responses resolve out of order', async () => {
    const resolvers: Array<(value: { data: any[]; total: number }) => void> = []
    const request = vi.fn(() => new Promise<{ data: any[]; total: number }>((resolve) => {
      resolvers.push(resolve)
    }))

    const wrapper = mount(ProTable, {
      props: {
        columns,
        request,
      },
    })

    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1))
    const reloadPromise = wrapper.vm.reload()
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2))

    resolvers[1]({ data: [{ id: 2, name: 'Latest', score: 100 }], total: 1 })
    await vi.waitFor(() => expect(wrapper.text()).toContain('Latest'))

    resolvers[0]({ data: [{ id: 1, name: 'Stale', score: 10 }], total: 1 })
    await reloadPromise

    expect(wrapper.text()).toContain('Latest')
    expect(wrapper.text()).not.toContain('Stale')
  })

  it('ignores stale request failures after a newer success', async () => {
    let rejectFirst!: (error: Error) => void
    let resolveSecond!: (value: { data: any[]; total: number }) => void
    const request = vi.fn()
      .mockImplementationOnce(() => new Promise((_, reject) => {
        rejectFirst = reject
      }))
      .mockImplementationOnce(() => new Promise((resolve) => {
        resolveSecond = resolve
      }))

    const wrapper = mount(ProTable, {
      props: {
        columns,
        request,
      },
    })

    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1))
    const reloadPromise = wrapper.vm.reload()
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2))

    resolveSecond({ data: [{ id: 2, name: 'Recovered', score: 99 }], total: 1 })
    await vi.waitFor(() => expect(wrapper.text()).toContain('Recovered'))

    rejectFirst(new Error('stale network'))
    await reloadPromise

    expect(wrapper.find('.my-pro-table__error').exists()).toBe(false)
    expect(wrapper.text()).toContain('Recovered')
  })

  it('supports changing page size and hiding pagination', async () => {
    const request = vi.fn().mockResolvedValue({ data: [], total: 40 })
    const wrapper = mount(ProTable, {
      props: {
        columns,
        request,
        pageSizes: [10, 20],
      },
    })

    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1))
    await vi.waitFor(() => expect(wrapper.get('select').attributes('disabled')).toBeUndefined())
    await wrapper.get('select').setValue('20')
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2))

    expect(request.mock.calls[1][0]).toMatchObject({ page: 1, pageSize: 20 })
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([1, 20])

    await wrapper.setProps({ pagination: false })
    expect(wrapper.find('.my-pro-table__pager').exists()).toBe(false)
  })
})
