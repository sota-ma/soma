<template>
  <div class="card border-0">
    <blockquote class="border card-footer text-center border-0 rounded">
      <p class="text">
        検索結果は
      </p>
      <p class="text">
        {{ numberOfResults }}件です
      </p>
    </blockquote>
  </div>
</template>

<script>
export default {
  props: {
    numberOfResults: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.text {
  display: inline-block;
}
</style>
