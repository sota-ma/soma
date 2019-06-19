<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="text-muted text-right">
        <p id="created-date" class="article-date">
          記事の作成日: {{ createdAt && createdAt.substr(0,10) }}
          作成者: hoge
        </p>
      </div>
      <div>
        <div id="title-ja" class="slug-title font-weight-bold">
          {{ titleJa }}
        </div>
        <div id="title-en" class="slug-subtitle">
          {{ titleEn }}
        </div>
      </div>
      <div class="tagline-style">
        <span> キーワード:  </span>
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="tag-style badge badge-primary"
        >
          {{ tag }}
        </span>
      </div>
      <div class="tagline-style">
        <span> 関連する診療科:  </span>
        <span
          v-for="(department, index) in departments"
          :key="index"
          class="tag-style badge badge-info"
        >
          {{ department }}
        </span>
      </div>
      <div class="tagline-style">
        <span> データセットの有無:  </span>
        <!-- キーワード等と同じように、右に「あり」「なし」を表示する-->
        </span>
      </div>
      <div>
        <a :href="articleURL" class="article-link">
          <button class="btn btn-outline-info font-weight-bold">
            PDF </button>
        </a>
        <button v-if="loggedin" class="article-link btn btn-outline-success" @click="toggleFavorite">
          「気になる」{{ isFavoritedArticle ? "から削除" : "に追加" }}
        </button>
      </div>
      <div>
        <p id="published-date" class="slug-date borderline">
          published at {{ publishedDate && publishedDate.substr(0,10) }}
        </p>
      </div>
      <div>
        <div id="abstract-ja">
          <h4 class="abstract-title font-weight-bold">
            要旨
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="abstractJa" />
        </div>
        <div id="abstract-en">
          <h4 class="abstract-title font-weight-bold">
            要旨(原文)
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="abstractEn" />
        </div>
      </div>
      <div>
        <h4 class="abstract-title font-weight-bold">
          スコア
        </h4>
        <div class="table-responsive">
          <table v-if="benchmark" class="table dataset-table">
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
              <template v-for="(dataset,i) in benchmark">
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
  asyncData({ error, params }) {
    return client
      .getEntries({
        'sys.id': params.slug
      })
      .then((entry) => {
        return {
          article: entry.items[0]
        }
      })
      .then(({ article }) => {
        return {
          articleId: article.sys.id,
          article: article,
          titleJa: article.fields.titleJa,
          titleEn: article.fields.titleEn,
          createdAt: article.sys.createdAt,
          publishedDate: article.fields.publishedDate,
          abstractEn: documentToHtmlString(article.fields.abstractEn),
          abstractJa: documentToHtmlString(article.fields.abstractJa),
          tags: article.fields.tag,
          articleURL: article.fields.linkToArticle,
          benchmark: article.fields.benchmark,
          departments: article.fields.relatedDepartment
        }
      })
      .catch(err => error({ message: err.message }))
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
    }
  }
}
</script>

<style scoped>
.container-slug {
  padding: 0 5% 0 %;
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

.btn{
  margin-left: -10px;
}

.tagline-style {
  margin: 10px 0 10px 0;
}

.tag-style {
  margin: 0 5px;
  font-size: 16px;
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

.dataset-table {
  max-width: 800px;
}

.abstract-title{
  margin-top: 40px;
}

.footermargin{
  margin: 40px 0;
}

</style>
