import Vue from 'vue'
import Vuex from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

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
  writers: state => state.writers,
  filteredArticles: state => (filteringWords, category) => {
    if (category === 'titleJa') {
      return state.articles.slice().filter(
        article => filteringWords.every(word => article.fields.titleJa.toLowerCase().indexOf(word.toLowerCase()) !== -1)
      )
    } else if (category === 'titleEn') {
      return state.articles.slice().filter(
        article => filteringWords.every(word => article.fields.titleEn.toLowerCase().indexOf(word.toLowerCase()) !== -1)
      )
    } else if (category === 'abstractEn') {
      return state.articles.slice().filter(
        article => filteringWords.every(word => documentToHtmlString(article.fields.abstractEn).toLowerCase().indexOf(word.toLowerCase()) !== 1)
      )
    } else if (category === 'abstractJa') {
      return state.articles.slice().filter(
        article => filteringWords.every(word => documentToHtmlString(article.fields.abstractJa).toLowerCase().indexOf(word.toLowerCase()) !== -1)
      )
    } else {
      return state.articles
    }
  }
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
