<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div id="about-page-body" class="container-fluid text-center">
      <h4>数名の有志によって運営されています。</h4>
      <h4>今後ともよろしくお願いします。</h4>
    </div>
    <div id="about-page-writers">
      <h3 class="container-fluid text-center">
        Writers
      </h3>
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

.card-deck {
  margin-left: 10px;
  margin-right: 10px;
  width: 95vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
