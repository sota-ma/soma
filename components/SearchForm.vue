<template>
  <div class="form-dev">
    <b-form inline @submit="submitData" @reset="resetData">
      <b-form-input
        v-model="form.filteringWords"
        required
        placeholder="Search..."
        class="input-form"
      />
      <b-form-select
        v-model="form.category"
        :options="categories"
        required
        class="category-form"
      />
      <b-button type="submit" variant="primary" size="sm">
        検索
      </b-button>
      <b-button type="reset" variant="success" size="sm">
        一覧
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        filteringWords: '',
        category: null
      },
      categories: [
        { text: 'カテゴリ選択', value: null },
        { text: 'タイトル(日本語訳)', value: 'titleJa' },
        { text: 'タイトル(原文)', value: 'titleEn' },
        { text: '要旨(日本語訳)', value: 'abstractJa' },
        { text: '要旨(原文)', value: 'abstractEn' }
      ]
    }
  },
  methods: {
    submitData(evt) {
      evt.preventDefault()
      this.$emit('request-filter', this.form.filteringWords.split(/\s+/), this.form.category)
    },
    resetData(evt) {
      evt.preventDefault()
      this.$emit('request-filter', [], '')
    }
  }
}
</script>

<style scoped>
.category-form {
  width: 20%;
}
.input-form {
  width: 45%;
  margin-left: 3rem
}
.form-dev {
  text-align: center;
  margin: 1rem;
}
</style>
