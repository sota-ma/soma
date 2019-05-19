<template>
  <span class="badge-tag badge badge-info">{{ name }}</span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.badge-tag {
  margin: 5px;
}

</style>
