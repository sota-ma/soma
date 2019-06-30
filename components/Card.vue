<template>
  <div :id="title" class="card">
    <div class="card-body" @click="click">
      <h5 class="abst font-weight-bold">
        {{ title }}
      </h5>
    </div>
    <div class="card-created-date card-footer text-muted">
      <div class="card-published-date text-muted small">
        <span v-if="publishedDate">論文投稿日：{{ publishedDate.substr(0,10) }}</span>
      </div>
      <div class="text-muted small">
        作成日：{{ date.substr(0,10) }}
      </div>
      <div class="text-muted small writer-name">
        <span v-if="writer">作成者：{{ writer }}</span>
      </div>
    </div>
    <b-popover v-if="heading" :target="title" triggers="hover focus" class="popover">
      <div v-if="images.length !== 0" class="image-area">
        <img :src="images[0].url">
      </div>
      <div class="abst-area">
        <span>{{ heading.substr(0, 35) }}...</span>
      </div>
    </b-popover>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    publishedDate: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: 'article'
    },
    images: {
      type: Array,
      default: () => []
    },
    heading: {
      type: String,
      default: ''
    },
    writer: {
      type: String,
      default: ''
    }
  },
  methods: {
    click() {
      this.$emit('card-click', this.id)
    },
    docToHtmlString(doc) {
      return documentToHtmlString(doc)
    }
  }
}
</script>

<style scoped>
.card {
  margin: 5px;
  cursor: pointer;
}
.card:hover {
  border-color: black;
}
.card-published-date{
  white-space: nowrap;
}
.abst {
  letter-spacing: 0.5px
}
.popover {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 28vh;
}
.popover .image-area {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20vh;
}
.popover .image-area img {
  height: 100%;
  width: auto;
}
.popover .abst-area {
  margin-top: 1vh;
  width: 100%;
  height: 7vh;
}
.writer-name {
  height: 16px;
}

</style>
