<template>
  <div>
    <common-header articlesis-active="true" />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div class="container-fluid">
      <div id="articles-card-column" class="card-columns">
        <article-card
          v-for="article in articles"
          :id="article.sys.id"
          :key="article.sys.id"
          :title="article.fields.titleJa"
          :date="article.sys.createdAt"
          :published-date="article.fields.publishedDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card'
import Header from '~/components/Header'
import contentful from '~/plugins/contentful'
import { mapGetters } from 'vuex'

const client = contentful.createClient()

export default {
  components: {
    'article-card': Card,
    'common-header': Header
  },
  computed: {
    ...mapGetters(['articles'])
  },
  async asyncData({ env, store }) {
    const articles = await client.getEntries({
      'content-type': env.CTF_BLOG_TYPE_ID,
      order: '-sys.createdAt'
    })
    store.commit('setArticles', articles.items)
  }
}

</script>

<style>
  #banner {
    padding: 40px
  }
  .card-columns {
    margin-top: 40px,
  }

  .active{
    font-size: 30px,
  }
</style>
