<template>
  <div>
    <common-header contactis-active="true" />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div id="contact-page-body" class="container-fluid text-center twi">
      <h5>代表者twitterアカウント</h5>
      <a href="https://twitter.com/kazuokiriyama_">https://twitter.com/kazuokiriyama_</a>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
export default {
  components: {
    'common-header': Header
  }
}
</script>

<style>
#banner {
  margin-top: 5rem;
}
.twi {
  margin-top: 5rem;
}
</style>
