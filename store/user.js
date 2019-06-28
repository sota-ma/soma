
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const firebaseFunctions = firebase.functions()
const addFav = firebaseFunctions.httpsCallable('add_fav')
const removeFav = firebaseFunctions.httpsCallable('remove_fav')
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
    return rootGetters.articles.filter(x => !!myFavs[x.sys.id])
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
  async fetchUserFavs({ commit, state, dispatch }, { userId }) {
    userId = (!userId) ? state.userId : userId
    if (!userId) {
      return
    }
    const snapshot = await favsCollection.doc(userId).get()
    if (snapshot.exists) {
      const data = snapshot.data()
      commit('setMyFavs', { myFavs: data.articles })
    }
  },
  async favArticle({ commit, state }, { articleId }) {
    if (state.userId === null) return
    await addFav({ article_id: articleId })
    commit('addMyFavs', articleId)
  },
  async unfavArticle({ commit, state }, { articleId }) {
    if (state.userId === null) return
    await removeFav({ article_id: articleId })
    commit('removeMyFavs', articleId)
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
