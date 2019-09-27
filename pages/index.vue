<template>
  <div class="back">
    <section class="container">
      <transition name="fade">
        <div v-show="isVisible">
          <div id="title">
            <logo width="250px" height="100px" />
          </div>
          <p id="subtitle">
            SOTA of Medical-AI
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
import Logo from '@/components/Logo'

export default {
  components: {
    'logo': Logo
  },
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
  background-color: #efdbec
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#title {
  display: block;
  font-family: t26-carbon,monospace;
  font-weight: 400;
  font-style: normal;
  color: #931b90;
}

#subtitle {
  font-family: t26-carbon,monospace;
  font-style: normal;
  color: #931b90;
}

.btn-success {
  background-color: #472baf;
  border-color: #472baf;
}

.btn-info {
  background-color: #389e33;
  border-color: #389e23;
}

</style>
