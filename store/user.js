
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const favsCollection = db.collection('favs')

export const state = function () {
  return {
    userId: null,
    myFavs: {}
  }
}

export const getters = {
  userId: state => state.userId,
  loggedin: state => (state.userId !== null),
  favoritedArticles(state, getters, rootState, rootGetters) {
    const myFavs = state.myFavs
    // rootGettersはproductionモードでは使用不可
    return rootGetters.articles.filter(x => !!myFavs[x.sys.id])
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
  async fetchUserFavs({ commit, state, dispatch }, payload) {
    let userId = null
    if (payload && payload.userId) {
      userId = payload.userId
    } else {
      if (state.userId === null) {
        return
      }
      userId = state.userId
    }
    const snapshot = await favsCollection.doc(userId).get()
    if (snapshot.exists) {
      const data = snapshot.data()
      commit('setMyFavs', { myFavs: data.articles })
    }
    await dispatch('fetchArticles', null, { root: true })
  },
  async favArticle({ commit, state }, { articleId }) {
    if (state.userId === null) return
    try {
      await this.$axios.$post(
        '/add_fav',
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
        '/remove_fav',
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
