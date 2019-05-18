<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <select-form-sort class="form" @request-sort="changeSortOrder" />
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
import SelectForm from '~/components/SelectForm'

const client = contentful.createClient()

export default {
  components: {
    'article-card': Card,
    'common-header': Header,
    'select-form-sort': SelectForm
  },
  data() {
    return {
      sortOrder: 1
    }
  },
  computed: {
    shownArticles: function () {
      if (this.sortOrder === 1) {
        return this.$store.state.articles.slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : b > a ? 1 : -1)
        })
      } else if (this.sortOrder === 2) {
        return this.$store.state.articles.slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : a > b ? 1 : -1)
        })
      } else if (this.sortOrder === 3) {
        return this.$store.state.articles.slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : b > a ? 1 : -1)
        })
      } else if (this.sortOrder === 4) {
        return this.$store.state.articles.slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : a > b ? 1 : -1)
        })
      } else {
        return this.$store.state.articles
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
    changeSortOrder(sortOrderIndex) {
      this.sortOrder = sortOrderIndex
    }
  }
}

</script>

<style>
  #banner {
    margin-top: 4rem
  }
  .card-deck {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 0.5rem
  }
  .form {
    width: 15rem;
    margin-top: 2rem;
    margin-left: 1rem
  }
</style>
