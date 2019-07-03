<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div id="contact-page-body" class="container-fluid text-center">
      <form @submit.prevent="query">
        <fieldset class="row">
          <div class="col-lg-6 offset-lg-3">
            <input id="email" v-model="email" class="form-control form-margin" placeholder="メールアドレス">
            <textarea id="queryText" v-model="queryText" class="form-control form-margin" rows="5" placeholder="お問い合わせ内容" />
            <b-button :disable="isProcessing" class="button" type="submit">
              送信
            </b-button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export default {
  components: {
    'common-header': Header
  },
  data() {
    return {
      queryText: '',
      email: '',
      isProcessing: false
    }
  },
  methods: {
    query() {
      this.isProcessing = true
      db.collection('queries').doc().set({
        date: new Date(),
        email: this.email,
        content: this.queryText
      })
        .then(() => {
          alert('お問い合わせありがとうございます。後ほどメールアドレス宛に回答を送信いたします。')
          this.reportText = ''
          this.email = ''
          this.isProcessing = false
        })
    }
  }
}
</script>
<style scoped>

.form-margin {
  margin: 10px;
}

</style>
