<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="text-muted text-right">
        <p id="created-date" class="article-date">
          記事の作成日: {{ articleDetail.createdAt && articleDetail.createdAt.substr(0,10) }}
          作成者: hoge
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
        <!-- キーワード等と同じように、右に「あり」「なし」を表示する-->
      </div>

      <div class="button-and-thumbnail row">
        <div class="button-area col-sm-3">
          <a :href="articleDetail.articleURL" class="article-link">
            <button class="btn btn-outline-info font-weight-bold">
              PDF </button>
          </a>
          <button v-if="loggedin" class="article-link btn btn-outline-success" @click="toggleFavorite">
            「気になる」{{ isFavoritedArticle ? "から削除" : "に追加" }}
          </button>
        </div>
        <div class="thumbnail-area col-sm-6">
          <img v-for="image in articleDetail.images" :key="image.name" :src="image.url" class="thumbnail">
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
          <span v-html="docToHtmlString(articleDetail.abstractJa)" />
        </div>
        <div id="abstract-en">
          <h4 class="abstract-title font-weight-bold">
            要旨(原文)
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="docToHtmlString(articleDetail.abstractEn)" />
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
        2019 Project SoMA
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
    ...mapGetters('user', ['loggedin']),
    ...mapGetters('article', ['articleDetail']),
    isFavoritedArticle() {
      return this.$store.getters['user/favoritedArticles'].some(article => article.sys.id === this.articleDetail.id)
    }
  },
  async fetch({ store, params }) {
    try {
      await store.dispatch('article/fetchArticleDetail', { slug: params.slug })
    } catch (e) {
      // TODO: #50が完了次第、そちらを組み込む
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
      if (this.isFavoritedArticle) {
        this.unfavoriteArticle()
      } else {
        this.favoriteArticle()
      }
    },
    docToHtmlString(doc) {
      return documentToHtmlString(doc)
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

.button-and-thumbnail {
  width: 100vw;
}

.button-and-thumbnail .thumbnail-area {
  height: 15vh;
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
}

.thumbnail {
  height: 100%;
  width: auto;
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
