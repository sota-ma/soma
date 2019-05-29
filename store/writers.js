import contentful from '~/plugins/contentful'

const client = contentful.createClient()

export const state = () => ({
  writers: []
})

export const mutations = {
  SET_WRITERS(state, { writers }) {
    state.writes = writers
  }
}

export const actions = {
  async getWriters({ commit }) {
    try {
      const writers = await client.getEntries({
        'content_type': 'writer',
        order: '-sys.createdAt'
      })
      commit('SET_WRITERS', writers.items)
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  allWriters(state) {
    return state.writers
  }
}
