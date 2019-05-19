import Vue from 'vue'
import Vuex from 'vuex'

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
            article => filteringWords.every(word => article.fields.titleJa.indexOf(word) !== -1)
          )
        } else if (category === 'h') {
          return state.articles
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
