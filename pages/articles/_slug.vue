<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="text-muted text-right">
        <p id="created-date" class="article-date">
          記事の作成日: {{ articleDetail.createdAt && articleDetail.createdAt.substr(0,10) }}
          作成者: {{ articleDetail.writer }}
          査読者: {{ articleDetail.validator }}
        </p>
      </div>
      <div>
        <div id="title-ja" class="slug-title font-weight-bold">
          {{ articleDetail.titleJa }}
        </div>
        <div id="title-en" class="slug-subtitle">
          {{ articleDetail.titleEn }}
        </div>
      </div>
      <div class="tagline-style">
        <span> キーワード:  </span>
        <span
          v-for="(tag, index) in articleDetail.tags"
          :key="index"
          class="tag-style badge badge-primary"
        >
          {{ tag }}
        </span>
      </div>
      <div class="tagline-style">
        <span> 関連する診療科:  </span>
        <span
          v-for="(department, index) in articleDetail.departments"
          :key="index"
          class="tag-style badge badge-info"
        >
          {{ department }}
        </span>
      </div>
      <div class="tagline-style">
        <span> データセットの有無:  </span>
        <span> {{ articleDetail.availability }} </span>
      </div>

      <div class="button">
        <div class="button-area">
          <a :href="articleDetail.articleURL" class="article-link">
            <button class="btn btn-outline-info font-weight-bold">
              PDF </button>
          </a>
          <button v-if="loggedin" class="article-link btn btn-outline-success" @click="toggleFavorite">
            「気になる」{{ isFavorite ? "から削除" : "に追加" }}
          </button>
        </div>
      </div>
      <div>
        <p id="published-date" class="slug-date borderline">
          published at {{ articleDetail.publishedDate && articleDetail.publishedDate.substr(0,10) }}
        </p>
      </div>
      <div>
        <div id="abstract-ja">
          <h4 class="abstract-title font-weight-bold">
            要旨
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="renderHtmlString(articleDetail.abstractJa)" />
        </div>
        <div id="abstract-en">
          <h4 class="abstract-title font-weight-bold">
            要旨(原文)
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="renderHtmlString(articleDetail.abstractEn)" />
        </div>
      </div>
      <div>
        <h4 class="abstract-title font-weight-bold">
          スコア
        </h4>
        <div class="table-responsive">
          <table v-if="articleDetail.benchmark" class="table dataset-table">
            <thead class="thead-light">
              <tr>
                <th scope="col">
                  データセット
                </th>
                <th scope="col">
                  データセットの入手
                </th>
                <th scope="col">
                  指標
                </th><th scope="col">
                  スコア
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(dataset,i) in articleDetail.benchmark">
                <tr v-for="(score, j) in dataset.scores" :key="i+','+j">
                  <th v-if="j === 0" scope="row">
                    {{ dataset.dataset }}
                  </th>
                  <th v-else scope="row" />
                  <th v-if="j === 0" scope="row">
                    {{ formattedAvailability(dataset.availability) }}
                  </th>
                  <th v-else scope="row" />
                  <th scope="row">
                    {{ score.index }}
                  </th>
                  <th scope="row">
                    {{ score.score }}
                  </th>
                </tr>
              </template>
            </tbody>
          </table>
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

export default {
  transition: 'slide-right',
  components: {
    'common-header': Header
  },
  computed: {
    ...mapGetters('user', ['loggedin', 'isFavoriteArticle']),
    ...mapGetters('article', ['articleDetail']),
    isFavorite() {
      return this.isFavoriteArticle(this.articleDetail.id)
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('article/fetchArticleDetail', { slug: params.slug })
    } catch (e) {
      error({ message: e.message })
    }
  },
  methods: {
    formattedAvailability(text) {
      if (text === 'available') {
        return '入手可能'
      } else if (text === 'need_register') {
        return '登録が必要'
      } else if (text === 'need_email') {
        return '担当者にメールが必要'
      } else if (text === 'unavailable') {
        return '入手不可'
      } else {
        return 'その他'
      }
    },
    favoriteArticle() {
      this.$store.dispatch('user/favArticle', { articleId: this.articleDetail.id })
    },
    unfavoriteArticle() {
      this.$store.dispatch('user/unfavArticle', { articleId: this.articleDetail.id })
    },
    toggleFavorite() {
      if (this.isFavorite) {
        this.unfavoriteArticle()
      } else {
        this.favoriteArticle()
      }
    },
    renderHtmlString(doc) {
      const options = {
        renderNode: {
          'embedded-asset-block': (node) => {
            const file = node.data.target.fields.file
            return '<div align="center"><img src=' + file.url + ' style="max-width: 80%;"></div>'
          }
        }
      }
      return documentToHtmlString(doc, options)
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
  margin-bottom: 0;
  padding: 10px 10px 0px 0px;
}

.slug-subtitle {
  margin-bottom: 0;
  padding: 10px 10px 0px 0px;
}

.btn {
  margin-left: -10px;
}

.tagline-style {
  margin: 10px 0 10px 0;
}

.tag-style {
  margin: 0 5px;
  font-size: 16px;
}

.button {
  height: 15vh;
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
}

.article-date{
  font-size: 12px;
  padding-top: 10px;
}

.slug-date {
  font-size: 12px;
  padding-bottom: 4px;
}

.borderline{
  border-bottom: 1px solid #C2C2C7;
}

.article-link {
  display: inline-block;
  margin: 10px;
}

.abstract-title{
  margin-top: 40px;
}

.footermargin{
  margin: 40px 0;
}

</style>
