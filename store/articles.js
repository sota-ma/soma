import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const ARTICLE_CATEGORIES = ['titleJa', 'titleEn', 'abstractEn', 'abstractJa']

export const state = () => ({
  articles: [],
  filteringWords: [],
  category: ''
})

export const mutations = {
  // mutationはactions以外から呼び出せない特殊な関数を定義するため、一目でそれと分かるように大文字で書く
  SET_ARTICLES(state, { articles }) {
    state.articles = articles
  },
  SET_CATEGORY(state, { category }) {
    state.category = category
  },
  SET_FILTERING_WORDS(state, { filteringWords }) {
    state.filteringWords = filteringWords
  }
}

export const actions = {
  setArticles({ commit }, { articles }) {
    commit('SET_ARTICLES', { articles })
  },
  setCategory({ commit }, { category }) {
    if (!ARTICLE_CATEGORIES.includes(category)) {
      throw new Error('invalid arguments for setCategory args: ' + category)
    }
    commit('SET_CATEGORY', { category })
  },
  setFilteringWords({ commit }, { filteringWords }) {
    commit('SET_FILTERING_WORDS', { filteringWords })
  }
}

export const getters = {
  articles(state) {
    return state.articles
  },
  filteredArticles(state) {
    const filteringWords = state.filteringWords
    const articles = state.articles
    const category = state.category

    switch (category) {
      case 'titleJa':
        return articles.slice().filter(
          article => filteringWords.every(word => article.fields.titleJa.toLowerCase().indexOf(word.toLowerCase()) !== -1)
        )
      case 'titleEn':
        return articles.slice().filter(
          article => filteringWords.every(word => article.fields.titleEn.toLowerCase().indexOf(word.toLowerCase()) !== -1)
        )
      case 'abstractEn':
        return articles.slice().filter(
          article => filteringWords.every(word => documentToHtmlString(article.fields.abstractEn).toLowerCase().indexOf(word.toLowerCase()) !== 1)
        )
      case 'abstractJa':
        return articles.slice().filter(
          article => filteringWords.every(word => documentToHtmlString(article.fields.abstractJa).toLowerCase().indexOf(word.toLowerCase()) !== -1)
        )
      default:
        return articles
    }
  }
}
