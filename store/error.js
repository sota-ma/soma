export const state = () => ({
  error: false
})

export const mutations = {
  SET_ERROR(state, { msg }) {
    state.error = msg
  }
}

export const actions = {
  setError({ commit }, { msg }) {
    commit('SET_ERROR', { msg })
  },
  clearError({ commit }) {
    commit('SET_ERROR', { msg: false })
  }
}

export const getters = {
  errorMsg(state) {
    return state.error
  }
}
