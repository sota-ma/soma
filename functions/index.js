/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');

const app = express();

const nuxt = new Nuxt({
    dev: false,
    buildDir: 'nuxt',
    build: {
        publicPath: '/assets/'
    }
});

app.get('/', (req, res) => {
  nuxt.renderRoute('/', { req })
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

exports.ssrapp = functions.https.onRequest(app)

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const fireStore = admin.firestore()
const arrayUnion = admin.firestore.FieldValue.arrayUnion
const arrayRemove = admin.firestore.FieldValue.arrayRemove
const favsCollection = fireStore.collection('favs')
const articlesCollection = fireStore.collection('articles')

exports.add_fav = functions.https.onCall(async (data, context) => {
  if(context.auth===null){return {"error":"Not authorized"}}
  let userId = context.auth.uid
  let articleId = data.article_id
  console.log(userId,articleId)

  await favsCollection.doc(userId).set({
    'articles': arrayUnion(articleId) }, { merge: true })
  await articlesCollection.doc(articleId).set({
    'users': arrayUnion(userId) }, { merge: true })
  return {"ok":true}
});

exports.remove_fav = functions.https.onCall(async (data, context) => {
  if(context.auth===null){return {"error":"Not authorized"}}
  let userId = context.auth.uid
  let articleId = data.article_id
  console.log(userId,articleId)

  await favsCollection.doc(userId).set({
    'articles': arrayRemove(articleId) }, { merge: true })
  await articlesCollection.doc(articleId).set({
    'users': arrayRemove(userId) }, { merge: true })
  return {"ok":true}
});