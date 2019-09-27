<template>
  <div class="form-dev">
    <b-form inline @submit.prevent="submitData" @reset.prevent="resetData">
      <b-form-input
        v-model="form.filteringWords"
        required
        placeholder="キーワードで検索"
        class="input-form"
      />
      <button type="submit" size="md" class="button-searchform btn btn-success">
        検索
      </button>
      <button
        v-show="restoreButtonIsVisible"
        type="button"
        class="restore-button btn btn-primary"
        @click.prevent="restoreArticles"
      >
        一覧に戻る
      </button>
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
  width: 75%;
}
.button-searchform{
  margin: 0 0.5rem 0 0;
}
.restore-button {
  margin: 0 0.5rem 0 0;
}

.btn-success {
  background-color: #472baf;
  border-color: #472baf;
}

.btn-primary {
  background-color: #389e23;
  border-color: #389e23;
}
</style>
