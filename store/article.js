import ArticleList from './model/ArticleList'
import { RepositoryFactory } from './repository/RepositoryFactory'
const repository = RepositoryFactory.get('article')

const CATEGORIES = {
  titleJa: {
    val: 'titleJa',
    text: 'タイトル(日本語訳)'
  },
  titleEn: {
    val: 'titleEn',
    text: 'タイトル(原文)'
  },
  abstractEn: {
    val: 'abstractEn',
    text: '要旨(日本語訳)'
  },
  abstractJa: {
    val: 'abstractJa',
    text: 'abstractEn'
  }
}

export const state = () => ({
  articles: [],
  fetched: false,
  filteringWords: [],
  category: '',
  sortOrder: 1
})

export const mutations = {
  SET_ARTICLES(state, { articles }) {
    state.articles = articles
  },
  SET_FETCHED(state, payload) {
    state.fetched = !!payload
  },
  SET_CATEGORY(state, { category }) {
    state.category = category
  },
  SET_FILTERING_WORDS(state, { filteringWords }) {
    state.filteringWords = filteringWords
  }
}

export const actions = {
  async fetchArticles({ commit, state }) {
    if (state.fetched) return
    commit('SET_FETCHED')
    const articles = await repository.fetchAll()
    const articleList = new ArticleList(articles.items)
    commit('SET_ARTICLES', { articles: articleList })
  },
  setCategory({ commit }, { category }) {
    const articleCategory = Object.keys(CATEGORIES)
    if (!articleCategory.includes(category)) {
      throw new Error('invalid category: ' + category)
    }
    commit('SET_CATEGORY', { category })
  },
  clearCategory({ commit }) {
    commit('SET_CATEGORY', { category: '' })
  },
  setFilteringWords({ commit }, { filteringWords }) {
    commit('SET_FILTERING_WORDS', { filteringWords })
  }
}

export const getters = {
  writers(state) {
    return state.writers
  },
  filteredArticles(state) {
    const category = state.category
    const filteringWords = state.filteringWords
    return state.articles.getFilteredArticles({ filteringWords, category })
  }
}
