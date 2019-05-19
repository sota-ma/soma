<template>
  <div>
    <common-header />
    <div class="container-fluid container-slug">
      <div class="top-info row">
        <p id="title-ja" class="slug-title">
          {{ titleJa }}
        </p>
        <p id="title-ja" class="slug-subtitle text-muted">
          {{ titleEn }}
        </p>
        <div>
          <p id="created-date" class="slug-date">
            記事の作成日: {{ createdAt.substr(0,10) }}
          </p>
          <p id="published-date" class="slug-date">
            論文の投稿日: {{ publishedDate.substr(0,10) }}
          </p>
        </div>
      </div>
      <div class="row">
        <a :href="articleURL" class="article-link">
          <button class="btn btn-outline-info">
            論文pdf </button>
        </a>
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
        <div class="table-responsive">
          <table class="table dataset-table">
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
              <template v-for="dataset in benchmark">
                <tr v-for="(score, j) in dataset.scores" :key="j">
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
      <div class="row">
        <div id="abstract-en" class="col-sm-6">
          <h4 class="text-center abstract-title">
            要旨(原文)
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="abstractEn" />
        </div>
        <div id="abstract-ja" class="col-sm-6">
          <h4 class="text-center abstract-title">
            要旨(日本語訳)
          </h4>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="abstractJa" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import contentful from '~/plugins/contentful'

const client = contentful.createClient()

export default {
  transition: 'slide-right',
  components: {
    'common-header': Header
  },
  asyncData({ env, params }) {
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
      .catch()
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
