<style lang="scss">
  @import './login.scss';
</style>

<template>
  <div class="login">
    <div class="login-con" v-show="loginType === 'LOGIN'">
      <img class="logo" :src="require('@/assets/images/logo.png')" alt="logo">
      <Card icon="log-in" title="" :bordered="false" :dis-hover="true">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" @bindEvent="handleEvent"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
    <div class="login-con" v-show="loginType === 'SIGNIN'">
      <signIn-form @on-success-valid="handleSubmit" @bindEvent="handleEvent"></signIn-form>
    </div>
    <div class="copy-right-con">
      <p class="top"><span>帮助</span><span>隐私</span><span>条款</span></p>
      <p class="bottom">Copyright © ️2019 迈川健康有限公司出品</p>
    </div>
  </div>
</template>

<script>
import { LoginForm, SignInForm } from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm, SignInForm
  },
  data() {
    return {
      loginType: 'LOGIN' // LOGIN - 登录 SIGNIN - 注册
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleEvent({ type }) {
      switch (type) {
        case 'LOGIN': { // 登录form
          this.loginType = 'LOGIN'
          break
        }
        case 'SIGNIN': { // 注册form
          this.loginType = 'SIGNIN'
          break
        }
        case 'FORGET_PWD': { // 忘记密码
          break
        }
        default:
          break
      }
    },
    handleSubmit({ type, data }) {
      if (type === 'LOGIN_AP') { // 用账号密码登录
        const { account, password } = data
        this.handleLogin({ account, password }).then(res => {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          })
        })
      } else if (type === 'LOGIN_MC') { // 用手机号验证码登录

      } else if (type === 'SIGNIN') { // 注册

      }
    }
  }
}
</script>
