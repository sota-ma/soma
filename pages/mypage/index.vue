<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div id="about-page-body" class="container-fluid text-center">
      <h4>あなたのお気に入り論文</h4>
    </div>
    <div id="about-page-writers">
      <h3 class="container-fluid text-center">
        Favs
      </h3>
      <div class="container-fluid">
        <div id="articles-card-column" class="card-deck">
          <article-card
            v-for="article in shownArticles"
            :id="article.sys.id"
            :key="article.sys.id"
            :title="article.fields.titleJa"
            :date="article.sys.createdAt"
            :published-date="article.fields.publishedDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Card from '~/components/Card'

export default {
  components: {
    'common-header': Header,
    'article-card': Card
  },
  computed: {
    shownArticles: function () {
      return this.$store.getters['user/favoritedArticles']
    }
  },
  async fetch({ error, store }) {
    try {
      await Promise.all([store.dispatch('user/fetchUserFavs'),
        store.dispatch('fetchArticles')])
    } catch (e) {
      error({ message: e.message })
    }
  }
}
</script>
<style scoped>

</style>
