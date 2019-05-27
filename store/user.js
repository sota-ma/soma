
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const favsCollection = db.collection('favs')
const articlesCollection = db.collection('articles')
const arrayUnion = firebase.firestore.FieldValue.arrayUnion
const arrayRemove = firebase.firestore.FieldValue.arrayRemove

export const state = function () {
  return {
    userId: null,
    myFavs: {}
  }
}

export const getters = {
  favoritedArticles(state, getters, rootState, rootGetters) {
    const myFavs = state.myFavs
    return rootGetters.articles.slice().filter(x => !!myFavs[x.sys.id])
  }
}

export const mutations = {
  setUser(state, { userId }) {
    state.userId = userId
  },
  setMyFavs(state, { myFavs }) {
    const res = {}
    myFavs.forEach((element) => {
      state.myFavs[element] = 1
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
    const userId = state.userId
    await db.runTransaction(async () => {
      await favsCollection.doc(userId).set({
        'articles': arrayUnion(articleId) }, { merge: true })
      await articlesCollection.doc(articleId).set({
        'users': arrayUnion(userId) }, { merge: true })
      commit('addMyFavs', articleId)
    })
  },
  async unfavArticle({ commit, state }, { articleId }) {
    if (state.userId === null) return
    const userId = state.userId
    await db.runTransaction(async () => {
      await favsCollection.doc(userId).set({
        'articles': arrayRemove(articleId) }, { merge: true })
      await articlesCollection.doc(articleId).set({
        'users': arrayRemove(userId) }, { merge: true })
      commit('removeMyFavs', articleId)
    })
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
