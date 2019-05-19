<template>
  <div class="card">
    <div class="card-published-date card-header text-center">
      published date：{{ publishedDate.substr(0,10) }}
    </div>
    <div class="card-body text-center">
      <h5 class="abst">
        {{ title }}
      </h5>
    </div>
    <!--
    <div class="card-created-date card-footer text-muted">
      <tag
        v-for="(item,index) in tags"
        :key="index"
        :color="5"
        :name="item"
      />
    </div> -->
    <div class="card-footer">
      <div class="float-left align-middle card-footer-left">
        <small class="text-muted">
          投稿日：{{ date.substr(0,10) }}
        </small>
      </div>
      <div class="float-right detail-btn text-center">
        <nuxt-link
          class="btn btn-success"
          role="button"
          :to="{name: 'articles-slug', params: {slug: id}}"
        >
          詳細
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
// import Tag from '@/components/Tag'
export default {
  components: {
    // 'tag': Tag
  },
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
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.abst {
  letter-spacing: 0.5px
}
.card {
  margin: 5px;
}
.card-footer{
  padding: 0.5rem 1rem;
}
.card-published-date{
  white-space: nowrap;
}
.card-footer-left{
  height:100%;
}
</style>
