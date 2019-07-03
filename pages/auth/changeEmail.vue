<template>
  <div>
    <common-header />
    <div class="container">
      <div class="card card-style">
        <h2 class="card-title">
          メールアドレス変更
        </h2>
        <form class="form-change-email" @submit.prevent="changeEmail">
          <span id="change-email" class="change-email" />
          <input
            id="new-email"
            v-model="newEmail"
            type="email"
            class="form-control"
            placeholder="新しいメールアドレス"
            required
            autofocus
          >
          <button class="btn btn-lg btn-primary btn-block btn-change-email" type="submit">
            登録
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  components: {
    'common-header': Header
  },
  data() {
    return {
      currentEmail: '',
      newEmail: ''
    }
  },
  methods: {
    ...mapActions('error', ['setError', 'clearError']),
    changeEmail() {
      this.clearError()
      const user = firebase.auth().currentUser
      user.updateEmail(this.newEmail)
        .then(() => {
          this.$store.dispatch('user/checkAuthState')
          this.$router.push('/articles')
        })
        .catch((e) => {
          switch (e.code) {
            case 'auth/invalid-email':
              this.setError({ msg: '無効なメールアドレスです。' })
              break
            case 'auth/email-already-in-use':
              this.setError({ msg: 'このメールアドレスは既に使われています。' })
              break
            case 'auth/requires-recent-login':
              this.setError({ msg: 'この操作を行うためには最近ログインしている必要があります。' })
              break
            default:
              this.setError({ msg: '不明なエラーが発生しました。運営にお問い合わせください。' })
          }
        })
    }
  }
}

</script>

<style scoped>

.card-style {
    max-width: 350px;
    background-color: #F7F7F7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.form-change-email input[type=email],
.form-change-email input[type=password],
.form-change-email input[type=text],
.form-change-email button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-change-email .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-change-email {
    background-color: rgb(104, 145, 162);
    padding: 0px;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
    background-color: rgb(12, 97, 33);
}

</style>
