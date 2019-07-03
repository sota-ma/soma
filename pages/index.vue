<template>
  <div class="back">
    <section class="container">
      <transition name="fade">
        <div v-show="isVisible">
          <h1 id="title">
            SOTA of Medical-AI
          </h1>
          <h2 id="subtitle">
            最新の医療AI論文を日本語で紹介します
          </h2>
          <h3>
            <nuxt-link to="/articles">
              <button id="link-to-articles" class="btn btn-success">
                論文一覧
              </button>
            </nuxt-link>
          </h3>
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
  font-weight: 300;
  font-size: 100px;
  color: #EBEBEB;
  letter-spacing: 1px;
}

#subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #EBEBEB;
  word-spacing: 5px;
  padding-bottom: 15px;
  letter-spacing: 0.5px;
}

</style>
