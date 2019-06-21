<template>
  <div class="form-dev">
    <b-form inline @submit.prevent="submitData" @reset.prevent="resetData">
      <b-form-select
        v-model="form.category"
        :options="categories"
        required
        class="category-form"
      />
      <b-form-input
        v-model="form.filteringWords"
        required
        placeholder="Search..."
        class="input-form"
      />
      <b-button type="submit" variant="primary" size="md" class="button-searchform">
        検索
      </b-button>
      <b-button type="reset" variant="outline-danger" size="md" class="button-searchform">
        Reset
      </b-button>
    </b-form>
    <b-button
      v-show="restoreButtonIsVisible"
      type="button"
      variant="outline-success"
      class="restore-button"
      @click.prevent="restoreArticles"
    >
      一覧に戻る
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restoreButtonIsVisible: false,
      form: {
        filteringWords: '',
        category: 'titleJa'
      },
      categories: [
        { text: 'タイトル(日本語訳)', value: 'titleJa' },
        { text: 'タイトル(原文)', value: 'titleEn' },
        { text: '要旨(日本語訳)', value: 'abstractJa' },
        { text: '要旨(原文)', value: 'abstractEn' }
      ]
    }
  },
  methods: {
    submitData() {
      this.restoreButtonIsVisible = true
      this.$emit('request-filter', this.form.filteringWords.split(/\s+/), this.form.category)
    },
    resetData() {
      this.form.filteringWords = ''
      this.form.category = 'titleJa'
    },
    restoreArticles() {
      this.form.filteringWords = ''
      this.form.category = 'titleJa'
      this.restoreButtonIsVisible = false
      this.$emit('request-restore', [], '')
    }
  }
}
</script>

<style scoped>
.form-dev {
  text-align: center;
  width: 80%;
}
.category-form {
  width: 20%;
  margin: 0 3rem 0 0;
  min-width: 12rem;
}
.input-form {
  width: 40%;
  margin-right: 0.25rem;
  min-width: 12rem;
}
.button-searchform{
  margin: 0 0.25rem;
}
.restore-button {
  margin-top: 1rem;
}
</style>
