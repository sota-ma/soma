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
          v-for="(writer,index) in allWriters"
          :key="index"
          :name-ja="writer.fields.nameJa"
          :name-en="writer.fields.nameEn"
          :institution="writer.fields.institution"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import writerCard from '@/components/WriterCard.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'common-header': Header,
    'writer-card': writerCard
  },
  computed: {
    ...mapGetters('writers', ['allWriters'])
  },
  async mounted() {
    try {
      await this.getWriters()
    } catch (e) {
      // TODO: error handling
    }
  },
  methods: {
    ...mapActions('writers', ['getWriters'])
  }
}
</script>
<style scoped>
#about-page-writers{
  margin-top: 4rem;
}

</style>
