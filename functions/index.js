/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const nuxt = new Nuxt({
    dev: false,
    buildDir: 'nuxt',
    build: {
        publicPath: '/assets/'
    }
});

app.get('/', (req, res) => {
  nuxt.renderRoute('/articles', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/about', (req, res) => {
  nuxt.renderRoute('/about', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/contact', (req, res) => {
  nuxt.renderRoute('/contact', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/articles', (req, res) => {
  nuxt.renderRoute('/articles', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/articles/:slug', (req, res) => {
  nuxt.renderRoute('/articles/' + req.params.slug, { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/columns', (req, res) => {
  nuxt.renderRoute('/columns', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/columns/:slug', (req, res) => {
  nuxt.renderRoute('/columns/' + req.params.slug, { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/mypage', (req, res) => {
  nuxt.renderRoute('/mypage', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/auth/signin', (req, res) => {
  nuxt.renderRoute('/auth/signin', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get('/auth/resetPassword', (req, res) => {
  nuxt.renderRoute('/auth/resetPassword', { req })
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      res.send(e)
    })
})

exports.ssrapp = functions.https.onRequest(app)

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const fireStore = admin.firestore()
const arrayUnion = admin.firestore.FieldValue.arrayUnion
const arrayRemove = admin.firestore.FieldValue.arrayRemove
const favsCollection = fireStore.collection('favs')
const articlesCollection = fireStore.collection('articles')

const favApp = express();
favApp.use(bodyParser.urlencoded({ extended: true }));
favApp.use(bodyParser.json());
favApp.use(cors());

favApp.post('/add_fav', async (req, res) => {
  try {
    const body = req.body
    if (!body.uid) {
      res.statusCode = 400;
      res.send({ error: "Not authorized" });
      return;
    }
    const userId = body.uid;
    const articleId = body.articleId;
    await favsCollection.doc(userId).set({
      'articles': arrayUnion(articleId) }, { merge: true })
    await articlesCollection.doc(articleId).set({
      'users': arrayUnion(userId) }, { merge: true })
    res.send({ ok: true })
  } catch (e) {
    console.error(e)
    res.send({ error: e.message })
  }
});
exports.add_fav = functions.https.onRequest(favApp);

const removeFavApp = express();
removeFavApp.use(bodyParser.urlencoded({ extended: true }));
removeFavApp.use(bodyParser.json());
removeFavApp.use(cors());

removeFavApp.post('/remove_fav', async (req, res) => {
  try {
    const body = req.body
    if (!body.uid) {
      res.statusCode = 400;
      res.send({ error: "Not authorized" });
      return;
    }
    const userId = body.uid;
    const articleId = body.articleId;
    await favsCollection.doc(userId).set({
      'articles': arrayRemove(articleId) }, { merge: true })
    await articlesCollection.doc(articleId).set({
      'users': arrayRemove(userId) }, { merge: true })
    res.send({ ok: true })
  } catch (e) {
    console.error(e)
    res.send({ error: e.message })
  }
});
exports.remove_fav = functions.https.onRequest(removeFavApp);

const fetchFavApp = express();
fetchFavApp.use(bodyParser.urlencoded({ extended: true }));
fetchFavApp.use(bodyParser.json());
fetchFavApp.use(cors());

fetchFavApp.post('/fetch_fav', async (req, res) => {
  try {
    const body = req.body
    if (!body.uid) {
      res.statusCode = 400;
      res.send({ error: "Not authorized" });
      return;
    }
    const userId = body.uid;
    const snapshot = await favsCollection.doc(userId).get()
    const favs = (snapshot.data().articles) ? snapshot.data().articles : []
    res.send({ favs })
  } catch (e) {
    console.error(e)
    res.send({ error: e.message })
  }
});
exports.fetch_fav = functions.https.onRequest(fetchFavApp);
