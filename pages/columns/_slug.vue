<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="top-info row">
        <p id="title" class="slug-title">
          {{ title }}
        </p>
        <div>
          <p id="created-date" class="slug-date">
            記事の作成日: {{ createdAt && createdAt.substr(0,10) }}
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
          v-for="(tag, index) in tags"
          :key="index"
          class="tag-style badge badge-primary"
        >
          {{ tag }}
        </span>
      </div>
      <div class="row">
        <span class="tag-style"> 関連する診療科:  </span>
        <span
          v-for="(department, index) in departments"
          :key="index"
          class="tag-style badge badge-info"
        >
          {{ department }}
        </span>
      </div>
      <div class="row">
        <div id="document" class="col-sm-6 offset-sm-3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="renderedDocument()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import consola from 'consola'
import Header from '~/components/Header'
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import contentful from '~/plugins/contentful'
const client = contentful.createClient()

export default {
  transition: 'slide-right',
  components: {
    'common-header': Header
  },
  computed: {
    ...mapGetters('user', ['loggedin']),
    isFavoritedArticle() {
      return this.$store.getters['user/favoritedArticles'].some(article => article.sys.id === this.articleId)
    }
  },
  asyncData({ env, params }) {
    return client
      .getEntries({
        'sys.id': params.slug
      })
      .then((entry) => {
        return {
          column: entry.items[0]
        }
      })
      .then(({ column }) => {
        return {
          columnId: column.sys.id,
          column: column,
          title: column.fields.title,
          tag: column.fields.tag,
          createdAt: column.sys.createdAt,
          document: column.fields.document,
          tags: column.fields.tag,
          departments: column.fields.relatedDepartment
        }
      })
      .catch()
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
            consola.log(jsx)
            return '<img src=' + jsx.data.attrs.src + '>'
          }
        }
      }
      return documentToHtmlString(this.document, options)
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
