<template>
  <div class='form-dev'>
    <b-form @submit="submitData" inline>
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
      <b-button type="submit" variant="primary">
        検索
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
      categories: [{ text: 'カテゴリ選択', value: null }, { text: 'タイトル', value: 'titleJa' }]
    }
  },
  methods: {
    submitData(evt) {
      evt.preventDefault()
      this.$emit('request-filter', this.form.filteringWords.split(/\s+/), this.form.category)
    }
  }
}
</script>

<style scoped>
.category-form {
  width: 20%;
}
.input-form {
  width: 50%;
  margin-left: 3rem
}
.form-dev {
  text-align: center;
  margin: 1rem;
}
</style>
