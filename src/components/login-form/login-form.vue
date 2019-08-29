<template>
  <Tabs :animated="false">
    <TabPane label="账户密码登录">
      <Form ref="accountPwdLoginForm" :model="accountPwdForm" :rules="accountPwdRules" @keydown.enter.native="handleAccountPwdSubmit">
        <FormItem prop="account">
          <Input v-model="accountPwdForm.account" placeholder="请输入账户">
            <span slot="prepend">
							<!-- perm_identity -->
              <i class="material-icons icon">&#xe8a6;</i><span class="vm ml-5">账户</span>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="accountPwdForm.password" placeholder="请输入密码">
            <span slot="prepend">
              <!-- lock_outline -->
              <i class="material-icons icon">&#xe899;</i><span class="vm ml-5">密码</span>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="autoLogin">
          <Checkbox v-model="accountPwdForm.autoLogin"><span class="checked-label">自动登录</span></Checkbox>
          <span class="pull-right f-pwd" @click="handleEvent('FORGET')">忘记密码</span>
          <span class="clear"></span>
        </FormItem>
        <FormItem>
          <Button @click="handleAccountPwdSubmit" type="primary" long>登录</Button>
        </FormItem>
        <FormItem>
          <span class="pull-right f-pwd" @click="handleEvent('SIGNIN')">注册账号</span>
          <span class="clear"></span>
        </FormItem>
      </Form>
    </TabPane>
    <TabPane label="账号登录">
      <Form ref="mobileCodeLoginForm" :model="mobileCodeForm" :rules="mobileCodeRules" @keydown.enter.native="handleMobileCodeSubmit">
        <FormItem prop="mobile">
          <Input v-model="mobileCodeForm.mobile" placeholder="可使用医道账号登录">
            <span slot="prepend">
              <!-- perm_identity -->
              <i class="material-icons icon">&#xe8a6;</i><span class="vm ml-5">手机号</span>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="smsCode">
          <Row>
            <Col span="17">
              <Input type="text" v-model="mobileCodeForm.smsCode" placeholder="">
              <span slot="prepend">
                <!-- mail_outline -->
                <i class="material-icons icon">&#xe0e1;</i><span class="vm ml-5">验证码</span>
              </span>
              <!-- check_circle -->
              <i class="material-icons icon" slot="append">&#xe86c;</i>
              </Input>
            </Col>
            <Col span="6" offset="1">
              <Button class="smsCode-btn" @click="getSmsCode()">{{smsCodeText}}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="autoLogin">
          <Checkbox v-model="mobileCodeForm.autoLogin"><span class="checked-label">自动登录</span></Checkbox>
        </FormItem>
        <FormItem>
          <Button @click="handleMobileCodeSubmit" type="primary" long>登录</Button>
        </FormItem>
        <FormItem>
          <span class="pull-right f-pwd" @click="handleEvent('SIGNIN')">注册账号</span>
          <span class="clear"></span>
        </FormItem>
      </Form>
    </TabPane>
  </Tabs>
</template>
<script>
const validateMobile = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('手机号码不能为空'))
  }
  const reg = /^1[1-9]\d{9}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号'))
  }
}
const validateSmsCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('验证码不能为空'))
  }
  const reg = /^\d{6}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的验证码'))
  }
}
export default {
  name: 'LoginForm',
  props: {
    accountRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    mobileRules: {
      type: Array,
      default: () => {
        return [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ]
      }
    },
    smsCodeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, validator: validateSmsCode, trigger: 'blur' }
        ]
      }
    }
  },
  data() {
    return {
      smsCodeFlag: true,
      smsCodeText: '获取验证码',
      accountPwdForm: {
        account: 'super_admin',
        password: '',
        autoLogin: false
      },
      mobileCodeForm: {
        mobile: '18856629873',
        smsCode: '',
        autoLogin: false
      }
    }
  },
  computed: {
    accountPwdRules() {
      return {
        account: this.accountRules,
        password: this.passwordRules
      }
    },
    mobileCodeRules() {
      return {
        mobile: this.mobileRules,
        smsCode: this.smsCodeRules
      }
    }
  },
  methods: {
    getSmsCode() { // 获取验证码
      const { mobile } = this.mobileCodeForm
      this.$refs.mobileCodeLoginForm.validateField('mobile')
      const reg = /^1[1-9]\d{9}$/
      if (!reg.test(mobile)) return

      if (this.smsCodeFlag) {
        this.smsCodeFlag = false
        clearInterval(this.smsCodeTimer)
        let count = 60
        this.smsCodeText = `${count}s`
        this.smsCodeTimer = setInterval(() => {
          count--
          if (count <= 0) {
            clearInterval(this.smsCodeTimer)
            this.smsCodeFlag = true
            this.smsCodeText = '获取验证码'
          } else {
            this.smsCodeText = `${count}s`
          }
        }, 1000)
        // ajax
        console.log('ajax')
      }
    },
    handleEvent(type) {
      switch (type) {
        case 'FORGET': {
          // 忘记密码
          this.$emit('bindEvent', { type: 'FORGET_PWD' })
          break
        }
        case 'SIGNIN': {
          // 注册账户
          this.$emit('bindEvent', { type: 'SIGNIN' })
          break
        }
      }
    },
    handleAccountPwdSubmit() {
      this.$refs.accountPwdLoginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            type: 'LOGIN_AP',
            data: {
              account: this.accountPwdForm.account,
              password: this.accountPwdForm.password
            }
          })
        }
      })
    },
    handleMobileCodeSubmit() {
      this.$refs.mobileCodeLoginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            type: 'LOGIN_MC',
            data: {
              mobile: this.mobileCodeForm.mobile,
              smsCode: this.mobileCodeForm.smsCode
            }
          })
        }
      })
    }
  }
}
</script>
