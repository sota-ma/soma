<template>
  <div class="back">
    <section class="container">
      <transition name="fade">
        <div v-show="isVisible">
          <h3 id="title">
            SOTA of Medical-AI
          </h3>
          <p id="subtitle">
            最新の医療AI論文を日本語で紹介します
          </p>
          <nuxt-link to="/articles">
            <button id="link-to-articles" class="btn btn-success">
              論文一覧
            </button>
          </nuxt-link>
          <nuxt-link to="/about">
            <button id="link-to-about" class="btn btn-info">
              このサイトについて
            </button>
          </nuxt-link>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    this.isVisible = true
  }
}

</script>

<style scoped>
.back {
  background-image: linear-gradient(-90deg, #3D1141, #474100);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  color: #EBEBEB;
}

#subtitle {
  color: #EBEBEB;
}

</style>
