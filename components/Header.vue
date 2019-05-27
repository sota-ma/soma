<template>
  <div id="header">
    <b-navbar class="header-color" toggleable="md" type="dark" variant="info" fixed="top">
      <b-navbar-brand to="/">
        Project SoMA
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/articles" :class="{ active:articlesIsActive }">
            Articles
          </b-nav-item>
          <b-nav-item to="/about" :class="{ active:aboutIsActive }">
            About
          </b-nav-item>
          <b-nav-item to="/contact" :class="{ active:contactIsActive }">
            Contact
          </b-nav-item>
          <b-nav-item v-if="!isLoggedIn" to="/auth/signin" :class="{ active:signInIsActive }">
            Login
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn" @click="signOut">
            Logout
          </b-nav-item>
          <b-nav-item v-if="!isLoggedIn" to="/auth/signup" :class="{ active:signUpIsActive }">
            Register
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn" to="/mypage" :class="{ active:mypageIsActive }">
            My page
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  computed: {
    currentRoute() {
      return this.$router.currentRoute.name
    },
    articlesIsActive() {
      return this.currentRoute === 'articles'
    },
    contactIsActive() {
      return this.currentRoute === 'contact'
    },
    aboutIsActive() {
      return this.currentRoute === 'about'
    },
    signInIsActive() {
      return this.currentRoute === 'auth-signin'
    },
    signUpIsActive() {
      return this.currentRoute === 'auth-signup'
    },
    mypageIsActive() {
      return this.currentRoute === 'mypage'
    }
  },
  created() {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true
      }
      unsubscribe()
    })
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        alert('ログアウトしました')
        this.$store.dispatch('user/checkAuthState')
        this.$router.push('/auth/signin')
      })
    }
  }
}
</script>

<style scoped>
.header-color {
  background-image: linear-gradient(-90deg, #3D1141, #474100);
}
#header{
  padding-top:4rem
}
</style>
