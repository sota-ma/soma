<template>
  <div>
    <b-navbar class="header-color" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">
        Project SoMA
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/articles" :class="{ active:articlesisActive }">
            Articles
          </b-nav-item>
          <b-nav-item to="/about" :class="{ active:aboutisActive }">
            About
          </b-nav-item>
          <b-nav-item to="/contact" :class="{ active:contactisActive }">
            Contact
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    articlesisActive: {
      type: String,
      default: ''
    },
    contactisActive: {
      type: String,
      default: ''
    },
    aboutisActive: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.header-color {
  background-image: linear-gradient(-90deg, #3D1141, #474100);
}
</style>
