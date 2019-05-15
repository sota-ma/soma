const firebase = require('firebase')

const prodConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  datbaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

const stagingConfig = {
  apiKey: process.env.FIREBASE_TEST_API_KEY,
  authDomain: process.env.FIREBASE_TEST_AUTH_DOMAIN,
  datbaseURL: process.env.FIREBASE_TEST_DATABASE_URL,
  projectId: process.env.FIREBASE_TEST_PROJECT_ID,
  storageBucket: process.env.FIREBASE_TEST_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_TEST_MESSAGING_SENDER_ID
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : stagingConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

module.exports = firebase
