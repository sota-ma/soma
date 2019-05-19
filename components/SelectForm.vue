<template>
  <div>
    <b-row>
      <b-col sm="min-content">
        <label>タイトル:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input
          v-model="filterCond.title"
          type="text"
          @input="sortArticles"
        />
      </b-col>
    </b-row>
    <b-form-select
      v-model="sortOrder"
      :options="sortOrderOptions"
      @change="sortArticles"
    >
      <template slot="first">
        <option :value="null" disabled>
          --記事の並べ替え--
        </option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
import consola from 'consola'

export default {
  data() {
    return {
      sortOrder: null,
      filterCond: {},
      sortOrderOptions: [
        { value: 1, text: '投稿日が新しい順' },
        { value: 2, text: '投稿日が古い順' },
        { value: 3, text: 'Published dateが新しい順' },
        { value: 4, text: 'Published dateが古い順' }
      ]
    }
  },
  methods: {
    sortArticles: function () {
      consola.log(this.filterCond)
      this.$emit('change', {
        sortOrder: this.sortOrder,
        filterCond: Object.assign({}, this.filterCond)
      })
    }
  }
}
</script>
