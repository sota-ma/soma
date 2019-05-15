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
    sortArticles: function ({ store }) {
      if (this.selected === '1') {
        this.$emit('changeFlag', 1)
      } else if (this.selected === '2') {
        this.$emit('changeFlag', 2)
      } else if (this.selected === '3') {
        this.$emit('changeFlag', 3)
      } else if (this.selected === '4') {
        this.$emit('changeFlag', 4)
      }
    }
  }
}
</script>
