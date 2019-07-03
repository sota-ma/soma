<template>
  <div v-if="loading" class="loading-page">
    <b-spinner id="spinner" label="Spinning" variant="secondary" />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
}
#spinner {
  position:absolute;
  width:58px;
  height:58px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
}
</style>
