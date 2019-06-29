<template>
  <div>
    <common-header />
    <div id="banner" class="container-fluid text-center">
      <h5>SOTA of Medical-AI</h5>
      <h6>最新の医療AI論文を日本語で</h6>
    </div>
    <div class="border" />
    <div id="change-user-info" class="container-fluid text-center">
      <h4>登録情報の変更</h4>
    </div>
    <div id="change-btn-area" align="center">
      <button class="btn btn-info" @click="changeEmail">
        メールアドレスの変更
      </button>
      <button class="btn btn-info" @click="changePassword">
        パスワードの変更
      </button>
    </div>
    <div class="border" />
    <div id="favorite-papers" class="container-fluid text-center">
      <h4>あなたのお気に入り論文</h4>
    </div>
    <div>
      <div class="container-fluid">
        <div v-if="favoritedArticles" id="articles-card-column" class="card-deck">
          <article-card
            v-for="article in favoritedArticles"
            :id="article.id"
            :key="article.id"
            :title="article.titleJa"
            :date="article.createdAt"
            :published-date="article.publishedDate"
            :images="article.images"
            :heading="article.heading"
            content-type="articles"
            @card-click="toSlug"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Card from '~/components/Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    'common-header': Header,
    'article-card': Card
  },
  computed: {
    ...mapGetters('user', ['favoritedArticles'])
  },
  async fetch({ error, store }) {
    try {
      await Promise.all(
        [
          store.dispatch('user/fetchUserFavs'),
          store.dispatch('article/fetchArticles')
        ]
      )
    } catch (e) {
      error({ message: e.message })
    }
  },
  methods: {
    changeEmail() {
      this.$router.push('/auth/changeEmail')
    },
    changePassword() {
      this.$router.push('/auth/resetPassword')
    },
    toSlug(id) {
      this.$router.push(`/articles/${id}`)
    }
  }
}
</script>

<style scoped>
#banner {
  margin-bottom: 3vh;
}

#change-user-info {
  margin-top: 3vh;
}

#change-btn-area {
  margin-bottom: 3vh;
}

#favorite-papers {
  margin-top: 3vh;
}

.card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 0.5rem
}

</style>
