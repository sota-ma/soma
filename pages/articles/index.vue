<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <search-form
      @request-filter="mutateFilterQuery"
    />
    <select-form-sort class="select-form" @request-sort="changeSortOrder" />
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
import SearchForm from '~/components/SearchForm'

const client = contentful.createClient()

export default {
  components: {
    'article-card': Card,
    'common-header': Header,
    'select-form-sort': SelectForm,
    'search-form': SearchForm
  },
  data() {
    return {
      sortOrder: 1,
      filteringWords: [],
      category: ''
    }
  },
  computed: {
    shownArticles: function () {
      if (this.sortOrder === 1) {
        return this.$store.getters.filteredArticles(this.filteringWords, this.category).slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : b > a ? 1 : -1)
        })
      } else if (this.sortOrder === 2) {
        return this.$store.getters.filteredArticles(this.filteringWords, this.category).slice().sort((a, b) => {
          a = a.sys.createdAt
          b = b.sys.createdAt
          return (a === b ? 0 : a > b ? 1 : -1)
        })
      } else if (this.sortOrder === 3) {
        return this.$store.getters.filteredArticles(this.filteringWords, this.category).slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : b > a ? 1 : -1)
        })
      } else if (this.sortOrder === 4) {
        return this.$store.getters.filteredArticles(this.filteringWords, this.category).slice().sort((a, b) => {
          a = (a.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.fields.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.fields.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.fields.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : a > b ? 1 : -1)
        })
      } else {
        return this.$store.getters.filteredArticles
      }
    }
  },
  async asyncData({ env, store }) {
    const articles = await client.getEntries({
      'content_type': 'article',
      order: '-sys.createdAt'
    })
    store.commit('setArticles', articles.items)
  },
  methods: {
    changeSortOrder(sortOrderIndex) {
      this.sortOrder = sortOrderIndex
    },
    mutateFilterQuery(filteringWords, category) {
      this.filteringWords = filteringWords
      this.category = category
    }
  }
}

</script>

<style scoped>
  .card-deck {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 0.5rem
  }
  .select-form {
    width: 15rem;
    margin-top: 2rem;
    margin-left: 1rem
  }
</style>
