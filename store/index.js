import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      articlesSortedbyDateDOWN: [],
      articlesSortedbyDateUP: [],
      articlesSortedbyPDateDOWN: [],
      articlesSortedbyPDateUP: []
    },
    getters: {
      articlesSortedbyDateDOWN: state => state.articlesSortedbyDateDOWN,
      articlesSortedbyDateUP: state => state.articlesSortedbyDateUP,
      articlesSortedbyPDateDOWN: state => state.articlesSortedbyPDateDOWN,
      articlesSortedbyPDateUP: state => state.articlesSortedbyPDateUP
    },
    mutations: {
      setArticles(state, articles) {
        const sortedArticlesbyDate = articles.slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : b > a ? 1 : -1)
        })
        const sortedArticlesbyPDate = articles.slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : b > a ? 1 : -1)
        })
        state.articlesSortedbyDateDOWN = sortedArticlesbyDate
        state.articlesSortedbyDateUP = sortedArticlesbyDate.slice().reverse()
        state.articlesSortedbyPDateDOWN = sortedArticlesbyPDate
        state.articlesSortedbyPDateUP = sortedArticlesbyPDate.slice().reverse()
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
