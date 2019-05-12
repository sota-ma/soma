<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
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
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: '1', text: '投稿日が新しい順' },
        { value: '2', text: '投稿日が古い順' },
        { value: '3', text: 'Published dateが新しい順' },
        { value: '4', text: 'Published dateが古い順' }
      ]
    }
  },
  methods: {
    ...mapMutations([
      'sortArticlesbyDateDOWN',
      'sortArticlesbyDateUP',
      'sortArticlesbyPDateDOWN',
      'sortArticlesbyPDateUP'
    ]),
    sortArticles: function ({ store }) {
      if (this.selected === '1') {
        this.$store.commit('sortArticlesbyDateDOWN')
      } else if (this.selected === '2') {
        this.$store.commit('sortArticlesbyDateUP')
      } else if (this.selected === '3') {
        this.$store.commit('sortArticlesbyPDateDOWN')
      } else if (this.selected === '4') {
        this.$store.commit('sortArticlesbyPDateUP')
      }
    }
  }
}
</script>
