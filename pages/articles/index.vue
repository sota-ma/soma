<template>
  <div>
    <common-header articlesis-active="true" />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <select-form-sort class="form" @changeFlag="changeflag" />
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
</template>

<script>
import Card from '~/components/Card'
import Header from '~/components/Header'
import contentful from '~/plugins/contentful'
import Selectform from '~/components/Selectform'

const client = contentful.createClient()

export default {
  components: {
    'article-card': Card,
    'common-header': Header,
    'select-form-sort': Selectform
  },
  data() {
    return {
      flag: 1
    }
  },
  computed: {
    shownArticles: function () {
      if (this.flag === 1) {
        return this.$store.state.articlesSortedbyDateDOWN
      } else if (this.flag === 2) {
        return this.$store.state.articlesSortedbyDateUP
      } else if (this.flag === 3) {
        return this.$store.state.articlesSortedbyPDateDOWN
      } else if (this.flag === 4) {
        return this.$store.state.articlesSortedbyPDateUP
      } else {
        return this.$store.state.articlesSortedbyDateDOWN
      }
    }
  },
  async asyncData({ env, store }) {
    const articles = await client.getEntries({
      'content-type': env.CTF_BLOG_TYPE_ID,
      order: '-sys.createdAt'
    })
    store.commit('setArticles', articles.items)
  },
  methods: {
    changeflag(num) {
      this.flag = num
    }
  }
}

</script>

<style>
  #banner {
    margin-top: 4rem;
  }
  .card-deck {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 0.5rem;
  }
  .form {
    width: 15rem;
    margin-top: 2rem;
    margin-left: 1rem
  }
</style>
