import contentfulClient from './client/contentful/contentful'
import WriterList from './model/WriterList'

const CONTENT_TYPE = 'writer'
const ORDER_BY_CREATED_AT = '-sys.createdAt'

export const state = () => ({
  writers: []
})

export const mutations = {
  SET_WRITERS(state, { writers }) {
    state.writers = writers
  }
}

export const actions = {
  async getWriters({ commit }) {
    const res = await contentfulClient.getEntries({
      'content_type': CONTENT_TYPE,
      order: ORDER_BY_CREATED_AT
    })
    const writers = new WriterList(res.items)
    commit('SET_WRITERS', { writers: writers.list })
  }
}

export const getters = {
  writers(state) {
    return state.writers
  }
}
