<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="閉じる" @click="closeClick">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    message: {
      type: String,
      default: 'すみません、エラーが発生しました。時間をおいて再度やり直してください。'
    }
  },
  methods: {
    closeClick() {
      this.$emit('close-click')
    }
  }
}
</script>

<style scoped>

.alert {
  position: absolute;
  top: 60px;
  left: 2.5vw;
  width: 95vw;
  height: 7vh;
  display: flex;
  justify-content: center;
}

</style>
