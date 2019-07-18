import Vue from 'vue'
import Vuex from 'vuex'

import contentful from '~/plugins/contentful'

Vue.use(Vuex)
const client = contentful.createClient()

export const state = function () {
  return {
    articles: [],
    writers: [],
    fetched: false
  }
}
export const getters = {
  articles: state => state.articles,
  writers: state => state.writers
}
export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  setWriters(state, writers) {
    state.writers = writers
  },
  setFetched(state) {
    state.fetched = true
  }
}
export const actions = {
  getArticles({ commit }, articles) {
    commit('setArticles', articles)
  },
  async fetchArticles({ commit, state }) {
    if (state.fetched) return
    commit('setFetched')
    const articles = await client.getEntries({
      'content_type': 'article',
      order: '-sys.createdAt'
    })
    commit('setArticles', articles.items)
  }
}
