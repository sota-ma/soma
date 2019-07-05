<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="text-muted text-right">
        <p id="created-date" class="slug-date">
          コラムの作成日: {{ columnDetail.createdAt && columnDetail.createdAt.substr(0,10) }}
          作成者: {{ columnDetail.writer }}
          査読者: {{ columnDetail.validator }}
        </p>
      </div>
      <div>
        <p id="title" class="slug-title font-weight-bold">
          {{ columnDetail.title }}
        </p>
      </div>
      <div>
        <button v-if="loggedin" class="article-link btn btn-outline-success" @click="toggleFavorite">
          「気になる」{{ isFavoritedArticle ? "から削除" : "に追加" }}
        </button>
      </div>
      <div class="tagline-style">
        <span class="tag-style"> キーワード:  </span>
        <span
          v-for="(tag, index) in columnDetail.tags"
          :key="index"
          class="tag-style badge badge-primary"
        >
          {{ tag }}
        </span>
      </div>
      <div class="tagline-style">
        <span class="tag-style"> 関連する診療科:  </span>
        <span
          v-for="(department, index) in columnDetail.departments"
          :key="index"
          class="tag-style badge badge-info"
        >
          {{ department }}
        </span>
      </div>
      <div>
        <p class="borderline" />
      </div>
      <div>
        <div id="document">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="renderedDocument()" />
        </div>
      </div>
      <div class="footermargin text-muted text-center">
        since 2019 Project SoMA
        <!-- ページ最下部の空白をいい感じにしたい -->
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
import Prism from '~/plugins/prism'

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
  mounted() {
    Prism.highlightAll()
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
    renderedDocument() {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const file = node.data.target.fields.file
            return '<div align="center"><img src=' + file.url + ' style="max-width: 80%;"></div>'
          },
          [BLOCKS.HEADING_2]: (node, next) => {
            return `<h2 style="margin: 40px 0px 8px;">${next(node.content)}</h2>`
          },
          [BLOCKS.HEADING_4]: (node, next) => {
            return `<h4 style="margin: 20px 0px 8px; font-weight: bold;">${next(node.content)}</h4>`
          }
        },
        renderMark: {
          [MARKS.CODE]: text => `<pre><code class="language-r language-python">${this.$md.render(text)}</code></pre>`
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
  max-width: 80%;
}

.slug-title {
  font-size: 32px;
  margin-bottom: 1rem;
  padding: 10px 10px 0px 0px;
}

.slug-subtitle {
  font-size: 16px;
  padding: 10px 10px 0px 10px;
}

.tag-style {
  margin: 10px 5px;
  font-size: 16px;
}

.slug-date {
  font-size: 12px;
  padding-top: 10px;
}

.tagline-style {
  margin: 10px 0 10px 0;
}

.article-link {
  display: inline-block;
}

.borderline{
  border-bottom: 1px solid #C2C2C7;
  margin: 16px 0 24px 0;

}

.footermargin{
  margin: 40px 0;
}

</style>
