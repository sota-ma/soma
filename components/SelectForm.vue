<template>
  <div>
    <b-form-group>
      <b-form-group
        label-cols-sm="4"
        label="タイトル:"
        label-align-sm="right"
      >
        <b-form-input
          v-model="filterCond.title"
          type="text"
          @input="change"
        />
      </b-form-group>
      <b-form-group
        label="タグ"
      >
        <form-list v-model="tags" />
      </b-form-group>
      <b-form-group>
        <b-form-select
          v-model="sortOrder"
          :options="sortOrderOptions"
          @change="change"
        >
          <template slot="first">
            <option :value="null" disabled>
              --記事の並べ替え--
            </option>
          </template>
        </b-form-select>
      </b-form-group>
    </b-form-group>
  </div>
</template>

<script>
import FormList from '@/components/FormList'

export default {
  components: {
    'form-list': FormList
  },
  data() {
    return {
      sortOrder: null,
      filterCond: { tags: [] },
      sortOrderOptions: [
        { value: 1, text: '投稿日が新しい順' },
        { value: 2, text: '投稿日が古い順' },
        { value: 3, text: 'Published dateが新しい順' },
        { value: 4, text: 'Published dateが古い順' }
      ]
    }
  },
  computed: {
    tags: {
      get() { return this.filterCond.tags },
      set(value) {
        this.filterCond.tags = value.slice()
        this.change()
      }
    }
  },
  methods: {
    change: function () {
      this.$emit('change', {
        sortOrder: this.sortOrder,
        filterCond: Object.assign({}, this.filterCond)
      })
    }
  }
}
</script>
