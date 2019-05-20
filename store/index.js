import Vue from 'vue'
import Vuex from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      articles: [],
      writers: []
    },
    getters: {
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
    },
    mutations: {
      setArticles(state, articles) {
        state.articles = articles
      },
      setWriters(state, writers) {
        state.writers = writers
      }
    },
    actions: {
      getArticles({ commit }, articles) {
        commit('setArticles', articles)
      }
    }
  })
}

export default createStore
