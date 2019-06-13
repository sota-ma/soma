import ColumnList from './model/ColumnList'
import { RepositoryFactory } from './repository/RepositoryFactory'
const repository = RepositoryFactory.get('column')

export const state = () => ({
  columns: [],
  fetched: false
})

export const mutations = {
  SET_COLUMNS(state, { columns }) {
    state.columns = columns
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
  }
}

export const getters = {
  writers(state) {
    return state.writers
  },
  columns(state) {
    return state.columns
  }
}
