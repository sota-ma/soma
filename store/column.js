import ColumnList from './model/ColumnList'
import { RepositoryFactory } from './repository/RepositoryFactory'
import ColumnDetail from './model/ColumnDetail'
const repository = RepositoryFactory.get('column')

export const state = () => ({
  columns: [],
  columnDetail: undefined,
  fetched: false
})

export const mutations = {
  SET_COLUMNS(state, { columns }) {
    state.columns = columns
  },
  SET_COLUMN_DETAIL(state, { columnDetail }) {
    state.columnDetail = columnDetail
  },
  SET_FETCHED(state, payload) {
    state.fetched = !!payload
  }
}

export const actions = {
  async fetchColumns({ commit, state }) {
    if (state.fetched) return
    commit('SET_FETCHED')
    const columns = await repository.fetchAll()
    const columnList = new ColumnList(columns.items)
    commit('SET_COLUMNS', { columns: columnList })
  },
  async fetchColumnDetail({ commit }, slug) {
    const res = await repository.fetch({ slug })
    const columnDetail = new ColumnDetail({
      id: res.sys.id,
      column: res,
      title: res.fields.title,
      createdAt: res.sys.createdAt,
      document: res.fields.document,
      tags: res.fields.tags,
      departments: res.fields.relatedDepartment
    })
    commit('SET_COLUMN_DETAIL', { columnDetail })
  }
}

export const getters = {
  writers(state) {
    return state.writers
  },
  columns(state) {
    return state.columns
  },
  columnDetail(state) {
    return state.columnDetail
  }
}
