<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center title">
      <h2>About SoMA</h2>
    </div>
    <div id="about-page-body" class="container-fluid about-body">
      <p>SoMAは機械学習の医療応用に関する論文を紹介するメディアです。医学生、医師を中心とした、少数精鋭の有志によって運営されています。</p>
      <p>最新の医療AIの論文の中から価値の高いものを厳選し、紹介します。翻訳・査読は全て医学生、医師が担当しています。要旨の日本語訳だけでなく、関連する用語の解説やデータセットのavailabilityなどの役立つ情報をまとめています。</p>
      <p>また、医学の専門知識を持つメンバーならではのコラムも不定期に更新いたします。</p>
      <p>今後ともよろしくお願いします。</p>
      <p>ご支援・執筆希望は<a href="https://sota-of-medicalai.firebaseapp.com/contact">こちら</a>から</p>
    </div>
    <div id="about-page-writers">
      <h2 class="container-fluid text-center">
        Writers
      </h2>
      <div class="container-fluid card-deck">
        <writer-card
          v-for="(writer,index) in writers"
          :key="index"
          :handle-name="writer.handleName"
          :name-ja="writer.nameJa"
          :name-en="writer.nameEn"
          :institution="writer.institution"
        />
      </div>
    </div>
    <div class="footermargin text-muted text-center">
      since 2019 Project SoMA
      <!-- ページ最下部の空白をいい感じにしたい -->
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import writerCard from '@/components/WriterCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'common-header': Header,
    'writer-card': writerCard
  },
  computed: {
    ...mapGetters({
      writers: 'writer/writers'
    })
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('writer/getWriters')
    } catch (e) {
      error({ message: e.message })
    }
  }
}
</script>
<style scoped>

#about-page-body {
  margin-top: 2rem;
}

#about-page-writers{
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.title{
  margin-top: 10px;
}

.about-body{
  width: 95vw;
}

.card-deck {
  margin-left: 10px;
  margin-right: 10px;
  width: 95vw;
  display: grid;
  grid-gap: 0.5rem;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.footermargin{
  margin: 40px 0;
}

</style>
