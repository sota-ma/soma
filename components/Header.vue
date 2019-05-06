<template>
  <div id="header">
    <nav class="navbar navbar-expand-lg navbar-dark header-color">
      <nuxt-link class="navbar-brand brand" to="/">
        Project SoMA
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="#navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item" :class="{ active:articlesisActive }">
            <nuxt-link class="nav-link" to="/articles">
              Articles
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active:aboutisActive }">
            <nuxt-link class="nav-link" to="/about">
              About
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active:contactisActive }">
            <nuxt-link class="nav-link" to="/contact">
              Contact
            </nuxt-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 ml-auto">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line
    'articlesisActive': String,
    // eslint-disable-next-line
    'contactisActive': String,
    // eslint-disable-next-line
    'aboutisActive': String
  }
}
</script>

<style>
.header-color {
  background-image: linear-gradient(-90deg, #3D1141, #474100);
}
</style>
