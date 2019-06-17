<template>
  <div class="card">
    <div class="card-body" @click="click">
      <h5 class="abst font-weight-bold">
        {{ title }}
      </h5>
    </div>
    <div class="card-created-date card-footer text-muted">
      <div class="card-published-date text-muted small">
        論文投稿日：{{ publishedDate.substr(0,10) }}
      </div>
      <div class="text-muted small">
        作成日：{{ date.substr(0,10) }}
      </div>
      <div class="text-muted small">
        作成者：
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    click() {
      this.$emit('card-click', this.id)
    }
  }
}
</script>

<style scoped>
.card {
  margin: 5px;
  cursor: pointer;
}
.card-published-date{
  white-space: nowrap;
}
.abst {
  letter-spacing: 0.5px
}
.detail-btn {
  margin: 15px 0px 0px 0px;
}
</style>
