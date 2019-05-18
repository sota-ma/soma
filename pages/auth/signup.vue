<template>
  <div>
    <common-header />
    <div class="container">
      <div class="card card-style">
        <h2 class="card-title">
          登録
        </h2>
        <form class="form-signin" @submit.prevent="registerUser">
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
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="form-control"
            placeholder="パスワード(確認)"
            required
          >
          <div v-if="showPasswordAlert" class="alert alert-danger" role="alert">
            パスワードが一致しません
          </div>
          <button :disabled="passwordIsNotSame" class="btn btn-lg btn-primary btn-block btn-signin" type="submit">
            登録
          </button>
        </form>
        <span> アカウントをお持ちですか？ </span>
        <nuxt-link to="/auth/signin" class="forgot-password">
          ログイン
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
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    passwordIsNotSame() {
      return this.password !== this.confirmPassword
    },
    showPasswordAlert() {
      return this.passwordIsNotSame && !!this.password && !!this.confirmPassword
    }
  },
  methods: {
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/articles')
        })
        .catch((e) => {
          if (e.code === 'auth/email-already-in-use') {
            alert('このメールアドレスはすでに使用されています')
          } else if (e.code === 'auth/invalid-email') {
            alert('無効なメールアドレスです')
          } else if (e.code === 'auth/operation-not-allowed') {
            alert('この操作は許可されていません')
          } else if (e.code === 'auth/weak-password') {
            alert('パスワードが弱すぎます。複雑なパスワードにしてください。')
          } else {
            alert('不明なエラーが発生しました。運営にお問い合わせください。')
          }
        })
    }
  }
}

</script>

<style>

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
