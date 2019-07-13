import ArticleList from './model/ArticleList'
import { RepositoryFactory } from './repository/RepositoryFactory'
import ArticleDetail from './model/ArticleDetail'
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
  filteringDepartment: '',
  category: '',
  sortOrder: 1,
  articleDetail: undefined
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
  },
  SET_FILTERING_DEPARTMENT(state, { department }) {
    state.filteringDepartment = department
  },
  SET_ARTICLE_DETAIL(state, { articleDetail }) {
    state.articleDetail = articleDetail
  }
}

export const actions = {
  async fetchArticles({ commit, state }) {
    if (state.fetched) return
    commit('SET_FETCHED')
    const articles = await repository.fetchAll()
    const articleList = new ArticleList(articles)
    commit('SET_ARTICLES', { articles: articleList })
  },
  async fetchArticleDetail({ commit }, { slug }) {
    const res = await repository.fetch({ slug })
    const articleDetail = new ArticleDetail(res)
    commit('SET_ARTICLE_DETAIL', { articleDetail })
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
  },
  setFilteringDepartment({ commit }, { department }) {
    commit('SET_FILTERING_DEPARTMENT', { department })
  }
}

export const getters = {
  writers(state) {
    return state.writers
  },
  filteredArticles(state) {
    const category = state.category
    const filteringWords = state.filteringWords
    const filteringDepartment = state.filteringDepartment
    const articles = new ArticleList(state.articles.list)
    return articles.getFilteredArticles(
      {
        filteringDepartment,
        filteringWords,
        category
      })
  },
  articleDetail(state) {
    return state.articleDetail
  }
}
