<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="top-info row">
        <p id="title" class="slug-title">
          {{ columnDetail.title }}
        </p>
        <div>
          <p id="created-date" class="slug-date">
            記事の作成日: {{ columnDetail.createdAt && columnDetail.createdAt.substr(0,10) }}
          </p>
        </div>
      </div>
      <div class="row">
        <button v-if="loggedin" class="article-link btn btn-outline-success" @click="toggleFavorite">
          「気になる」{{ isFavoritedArticle ? "から削除" : "に追加" }}
        </button>
      </div>
      <div class="row">
        <span class="tag-style"> キーワード:  </span>
        <span
          v-for="(tag, index) in columnDetail.tags"
          :key="index"
          class="tag-style badge badge-primary"
        >
          {{ tag }}
        </span>
      </div>
      <div class="row">
        <span class="tag-style"> 関連する診療科:  </span>
        <span
          v-for="(department, index) in columnDetail.departments"
          :key="index"
          class="tag-style badge badge-info"
        >
          {{ department }}
        </span>
      </div>
      <div class="row">
        <div id="document" class="col-sm-8 offset-sm-2">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="renderedDocument()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  transition: 'slide-right',
  components: {
    'common-header': Header
  },
  computed: {
    ...mapGetters('user', ['loggedin']),
    ...mapGetters('column', ['columnDetail']),
    isFavoritedArticle() {
      return this.$store.getters['user/favoritedArticles'].some(article => article.sys.id === this.articleId)
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('column/fetchColumnDetail', { slug: params.slug })
    } catch (e) {
      error({ message: e.message })
    }
  },
  methods: {
    favoriteArticle() {
      this.$store.dispatch('user/favArticle', { articleId: this.articleId })
    },
    unfavoriteArticle() {
      this.$store.dispatch('user/unfavArticle', { articleId: this.articleId })
    },
    toggleFavorite() {
      if (this.isFavoritedArticle) {
        this.unfavoriteArticle()
      } else {
        this.favoriteArticle()
      }
    },
    renderImage(file) {
      return <img src={file.url}/>
    },
    renderedDocument() {
      const options = {
        renderNode: {
          'embedded-asset-block': (node) => {
            const file = node.data.target.fields.file
            const jsx = this.renderImage(file)
            return '<img src=' + jsx.data.attrs.src + ' style="max-width: 100%;">'
          }
        }
      }
      return documentToHtmlString(this.columnDetail.document, options)
    }
  }
}
</script>

<style scoped>

.container-slug {
  padding: 0 5% 0 5%;
}

.slug-title {
  font-size: 24px;
  padding: 10px 10px 0px 10px;
}

.slug-subtitle {
  font-size: 16px;
  padding: 10px 10px 0px 10px;
}

.tag-style {
  margin: 5px;
}

.slug-date {
  margin: 10px;
}

.top-info {
  background-color:gainsboro;
}

.article-link {
  display: inline-block;
  margin: 10px;
}

.dataset-table {
  max-width: 800px;
}

</style>
