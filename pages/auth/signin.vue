<template>
  <div>
    <common-header />
    <div class="container">
      <div class="card card-style">
        <h2 class="card-title">
          ログイン
        </h2>
        <form class="form-signin" @submit.prevent="signIn">
          <span id="reauth-email" class="reauth-email" />
          <input
            id="input-email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="メールアドレス"
            required
            autofocus
          >
          <input
            id="input-password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="パスワード"
            required
          >
          <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">
            ログイン
          </button>
        </form>
        <nuxt-link to="resetPassword" class="forgot-password">
          パスワードを忘れましたか？
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import firebase from 'firebase'

export default {
  components: {
    'common-header': Header
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.dispatch('user/checkAuthState')
          this.$router.push('/articles')
        })
        .catch((e) => {
          if (e.code === 'auth/invalid-email') {
            alert('無効なメールアドレスです。')
          } else if (e.code === 'auth/user-disabled') {
            alert('このユーザーは現在使用できません。')
          } else if (e.code === 'auth/user-not-found') {
            alert('メールアドレスに対応するユーザーが存在しません。')
          } else if (e.code === 'auth/wrong-password') {
            alert('パスワードを間違えています。')
          } else {
            alert('不明なエラーが発生しました。運営にお問い合わせください。')
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

.form-signin input[type=email],
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
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

.forgot-password {
    color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus{
    color: rgb(12, 97, 33);
}

</style>
