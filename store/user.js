
import firebase from '~/plugins/firebase'

export const state = function () {
  return {
    userId: null,
    myFavs: {}
  }
}

export const getters = {
  userId: state => state.userId,
  loggedin: state => (state.userId !== null),
  favoritedArticles(state, getters, rootState) {
    const myFavs = state.myFavs
    return rootState.article.articles.list.filter(x => !!myFavs[x.id])
  },
  isFavoriteArticle: state => (articleId) => {
    const myFavs = state.myFavs
    return !!(myFavs[articleId])
  }
}

export const mutations = {
  setUser(state, { userId }) {
    state.userId = userId
  },
  setMyFavs(state, { myFavs }) {
    const res = {}
    if (!myFavs) return
    myFavs.forEach((element) => {
      res[element] = 1
    })
    state.myFavs = res
  },
  addMyFavs(state, newFav) {
    const res = Object.assign({}, state.myFavs)
    res[newFav] = 1
    state.myFavs = res
  },
  removeMyFavs(state, removeFav) {
    const res = Object.assign({}, state.myFavs)
    delete res[removeFav]
    state.myFavs = res
  }
}

export const actions = {
  async fetchUserFavs({ commit, state }) {
    if (!state.userId) return
    try {
      const res = await this.$axios.$post(
        '/api/fetch_fav/fetch_fav',
        {
          uid: state.userId
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          },
          withCredentials: false
        })
      commit('setMyFavs', { myFavs: res.favs })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('favFetch error: ' + e.message)
      throw e
    }
  },
  async favArticle({ commit, state }, { articleId }) {
    if (state.userId === null) return
    try {
      await this.$axios.$post(
        '/api/add_fav/add_fav',
        {
          uid: state.userId,
          articleId: articleId
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          },
          withCredentials: false
        })
      commit('addMyFavs', articleId)
    } catch (e) {
      throw e
    }
  },
  async unfavArticle({ commit, state }, { articleId }) {
    if (state.userId === null) return
    try {
      await this.$axios.$post(
        '/api/remove_fav/remove_fav',
        {
          uid: state.userId,
          articleId: articleId
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          },
          withCredentials: false
        })
      commit('removeMyFavs', articleId)
    } catch (e) {
      throw e
    }
  },
  async checkAuthState({ commit, state, dispatch }) {
    await new Promise((resolve) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        const userId = user ? user.uid : null
        commit('setUser', { userId })
        dispatch('fetchUserFavs').then(unsubscribe).then(resolve)
      })
    })
  }
}
