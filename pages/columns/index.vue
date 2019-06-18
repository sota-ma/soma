<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div class="container-fluid">
      <div id="columns-card-column" class="card-deck">
        <column-card
          v-for="column in columns.list"
          :id="column.id"
          :key="column.id"
          :title="column.title"
          :date="column.createdAt"
          content-type="columns"
          @card-click="toSlug"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card'
import Header from '~/components/Header'
import { mapGetters } from 'vuex'

export default {
  components: {
    'column-card': Card,
    'common-header': Header
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      columns: 'column/columns'
    })
  },
  async fetch({ store }) {
    await store.dispatch('column/fetchColumns')
  },
  methods: {
    toSlug(id) {
      this.$router.push(`/columns/${id}`)
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
  .under-search {
    display: inline-block;
  }
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
</style>
