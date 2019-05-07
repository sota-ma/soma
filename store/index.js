import Vuex from 'vuex'

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
