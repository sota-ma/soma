<template>
  <div id="header">
    <b-navbar class="header-color" toggleable="lg" type="dark" variant="info">
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
          <b-nav-item v-if="!isLoggedIn" to="/signin" :class="{ active:signInIsActive }">
            Login
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn">
            Logout
          </b-nav-item>
          <b-nav-item v-if="!isLoggedIn" to="/signup" :class="{ active:signUpIsActive }">
            Register
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    articlesIsActive: {
      type: Boolean,
      default: false
    },
    contactIsActive: {
      type: Boolean,
      default: false
    },
    aboutIsActive: {
      type: Boolean,
      default: false
    },
    loginIsActive: {
      type: Boolean,
      default: false
    },
    signupIsActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.header-color {
  background-image: linear-gradient(-90deg, #3D1141, #474100);
}
</style>
