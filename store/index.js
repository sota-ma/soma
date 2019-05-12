import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      articles: []
    },
    getters: {
      articles: state => state.articles
    },
    mutations: {
      setArticles(state, articles) {
        state.articles = articles
      },
      sortArticlesbyDateDOWN(state) {
        const sortedArticles = state.articles.slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : b > a ? 1 : -1)
        })
        state.articles = sortedArticles
      },
      sortArticlesbyDateUP(state) {
        const sortedArticles = state.articles.slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : a > b ? 1 : -1)
        })
        state.articles = sortedArticles
      },
      sortArticlesbyPDateDOWN(state) {
        const sortedArticles = state.articles.slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : b > a ? 1 : -1)
        })
        state.articles = sortedArticles
      },
      sortArticlesbyPDateUP(state) {
        const sortedArticles = state.articles.slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : a > b ? 1 : -1)
        })
        state.articles = sortedArticles
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
