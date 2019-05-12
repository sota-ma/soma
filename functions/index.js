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

exports.ssrapp = functions.https.onRequest(app);
