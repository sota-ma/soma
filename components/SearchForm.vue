<template>
  <div class="form-dev">
    <b-form inline @submit.prevent="submitData" @reset.prevent="resetData">
      <b-form-input
        v-model="form.filteringWords"
        required
        placeholder="キーワードで検索"
        class="input-form"
      />
      <b-button type="submit" variant="primary" size="md" class="button-searchform">
        検索
      </b-button>
      <b-button
        v-show="restoreButtonIsVisible"
        type="button"
        variant="outline-success"
        class="restore-button"
        @click.prevent="restoreArticles"
        >
        一覧に戻る
    </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restoreButtonIsVisible: false,
      form: {
        filteringWords: ''
      }
    }
  },
  methods: {
    submitData() {
      this.restoreButtonIsVisible = true
      this.$emit('request-filter', this.form.filteringWords.split(/\s+/))
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
}
.input-form {
  margin: 10px 10px 10px 0;
}
.button-searchform{
  margin: 0 0.5rem 0 0;
}
.restore-button {
  margin: 0 0.5rem 0 0;
}
</style>
