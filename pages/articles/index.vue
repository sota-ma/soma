<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div class="container-fluid">
      <select-department
        @search-by-department="searchByDepartment"
      />
    </div>
    <div class="container-fluid">
      <search-form
        @request-filter="mutateFilterQueryFilter"
        @request-restore="mutateFilterQueryReset"
      />
    </div>
    <div class="container-fluid">
      <select-form-sort class="select-form" @request-sort="changeSortOrder" />
      <div id="articles-card-column" class="card-deck">
        <article-card
          v-for="article in shownArticles"
          :id="article.id"
          :key="article.id"
          :title="article.titleJa"
          :date="article.createdAt"
          :published-date="article.publishedDate"
          :images="article.images"
          :heading="article.heading"
          content-type="articles"
          @card-click="toSlug"
        />
        <result-card
          v-show="resultCardIsVisible"
          :number-of-results="lengthArticles"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card'
import ResultCard from '~/components/ResultCard'
import Header from '~/components/Header'
import SelectForm from '~/components/SelectForm'
import SearchForm from '~/components/SearchForm'
import SelectDepartment from '~/components/SelectDepartment'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'article-card': Card,
    'common-header': Header,
    'select-department': SelectDepartment,
    'select-form-sort': SelectForm,
    'search-form': SearchForm,
    'result-card': ResultCard
  },
  data() {
    return {
      sortOrder: 1,
      filteringWords: [],
      category: '',
      resultCardIsVisible: false
    }
  },
  computed: {
    ...mapGetters({
      filteredArticles: 'article/filteredArticles'
    }),
    lengthArticles: function () {
      return this.shownArticles.length
    },
    shownArticles: function () {
      if (this.sortOrder === 1) {
        return this.filteredArticles.slice().sort((a, b) => {
          a = a.createdAt
          b = b.createdAt
          return (a === b ? 0 : b > a ? 1 : -1)
        })
      } else if (this.sortOrder === 2) {
        return this.filteredArticles.slice().sort((a, b) => {
          a = a.createdAt
          b = b.createdAt
          return (a === b ? 0 : a > b ? 1 : -1)
        })
      } else if (this.sortOrder === 3) {
        return this.filteredArticles.slice().sort((a, b) => {
          a = (a.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : b > a ? 1 : -1)
        })
      } else if (this.sortOrder === 4) {
        return this.filteredArticles.slice().sort((a, b) => {
          a = (a.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(a.publishedDate.slice(0, 10).split('-')).getTime())
          b = (b.publishedDate === undefined ? new Date(1000, 1, 1).getTime() : new Date(b.publishedDate.slice(0, 10).split('-')).getTime())
          return (a === b ? 0 : a > b ? 1 : -1)
        })
      } else {
        return this.filteredArticles
      }
    }
  },
  async fetch({ error, store }) {
    try {
      await store.dispatch('article/fetchArticles')
    } catch (e) {
      error({ message: e.message })
    }
  },
  methods: {
    ...mapActions({
      setCategory: 'article/setCategory',
      clearCategory: 'article/clearCategory',
      setFilteringWords: 'article/setFilteringWords',
      setFilteringDepartment: 'article/setFilteringDepartment'
    }),
    changeSortOrder(sortOrderIndex) {
      this.sortOrder = sortOrderIndex
    },
    mutateFilterQueryFilter(filteringWords, category) {
      this.setCategory({ category })
      this.setFilteringWords({ filteringWords })
      this.resultCardIsVisible = true
    },
    mutateFilterQueryReset(filteringWords) {
      this.clearCategory()
      this.setFilteringWords({ filteringWords })
      this.resultCardIsVisible = false
    },
    searchByDepartment(department) {
      this.setFilteringDepartment({ department })
    },
    toSlug(id) {
      this.$router.push(`/articles/${id}`)
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
    margin: 2rem 0 1rem 0;
  }
  .under-search {
    display: inline-block;
  }
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 95%;
  }
</style>
