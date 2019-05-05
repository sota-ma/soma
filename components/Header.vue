<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">
    Project SoMA
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/articles" :class="{ active:articlesisActive }">Articles</b-nav-item>
        <b-nav-item to="/about" :class="{ active:aboutisActive }">About</b-nav-item>
        <b-nav-item to="/contact" :class="{ active:contactisActive }">Contact</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
