<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center title">
      <h2>Columns</h2>
    </div>
    <div class="container-fluid">
      <div id="columns-card-column" class="card-deck">
        <column-card
          v-for="column in columns.list"
          :id="column.id"
          :key="column.id"
          :title="column.title"
          :date="column.createdAt"
          :writer="column.writer"
          content-type="columns"
          @card-click="toSlug"
        />
      </div>
    </div>
    <div class="footermargin text-muted text-center">
      since 2019 Project SoMA
      <!-- ページ最下部の空白をいい感じにしたい -->
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
  async fetch({ store, error }) {
    try {
      await store.dispatch('column/fetchColumns')
    } catch (e) {
      error({ message: e.message })
    }
  },
  methods: {
    toSlug(id) {
      this.$router.push(`/columns/${id}`)
    }
  }
}

</script>

<style scoped>
  .title {
    margin-top: 10px;
  }
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
    max-width: 95%;
  }

  .footermargin{
  margin: 40px 0;
  }
</style>
