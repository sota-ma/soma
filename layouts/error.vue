<template>
  <div class="container">
    <Header></Header>
    <div class="row">
      <div class="col-md-12">
        <div class="error-template">
          <h1>{{ title }}</h1>
          <h2>{{ englishTitle }}</h2>
          <div class="error-details">
            {{ error.message }}
          </div>
          <div class="error-actions">
            <a href="/" class="btn btn-primary btn-lg"><span
              class="glyphicon glyphicon-home"></span>
              Home</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    title() {
      switch (this.error.statusCode) {
        case 404:
          return 'お探しのページは存在しないようです。'
        case 500:
        default:
          return '申し訳ありません。エラーが発生しました。'
      }
    },
    englishTitle() {
      switch (this.error.statusCode) {
        case 404:
          return 'Sorry, an error has occured, Requested page not found!'
        case 500:
        default:
          return 'Sorry, an error has occured, Please try again later!'
      }
    }
  }
}
</script>

<style scoped>
.error-template {
  padding: 40px 15px;
  text-align: center;
}

.error-actions {
  margin-top: 15px;
  margin-bottom: 15px;
}

.error-actions .btn {
  margin-right: 10px;
}
</style>
