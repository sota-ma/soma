<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h2>Sponsors</h2>
      <p class="text-muted">
        クラウドファンディングでご支援していただいた皆様
      </p>
    </div>
    <br>
    <div id="sponsors-page-body" class="container-fluid text-center">
      <b-alert show variant="primary">
        50000円のご支援
      </b-alert>
      <p v-for="item in bigUsernames" :key="item" class="sponsors-50000">
        {{ item }} 様
      </p>
      <br><br>
      <b-alert show variant="info">
        10000円のご支援
      </b-alert>
      <p v-for="item in usernames" :key="item" class="sponsors-10000">
        {{ item }} 様
      </p>
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
      isProcessing: false,
      bigUsernames: [
        'icoxofog417',
        'ビートいなにわ',
        '(2口) yamamuteki',
        'kinowaki'
      ],
      usernames: [
        'eiji2102',
        '西場 正浩',
        '@iktakahiro'
      ]
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

#sponsors-page-body {
    max-width: 700px;
}

.sponsors-50000 {
  font-size: 25px;
  margin: 10px;
}

.sponsors-10000 {
    font-size: 15px;
    margin: 10px;
}

.form-margin {
  margin: 10px;
}

.footermargin{
  margin: 40px 0;
}

</style>
