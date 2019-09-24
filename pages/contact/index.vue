<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center title">
      <h2>Contact</h2>
      <p class="text-muted">
        バグの報告・改善要求・支援のご連絡・執筆希望などはこちらからご連絡ください。
      </p>
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
    <div class="footermargin text-muted text-center">
      since 2019 Project SoMA
      <!-- ページ最下部の空白をいい感じにしたい -->
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
.title{
  margin-top: 10px;
}

.form-margin {
  margin: 10px;
}

.footermargin{
  margin: 40px 0;
}

</style>
