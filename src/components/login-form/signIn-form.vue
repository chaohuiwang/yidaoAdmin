<style lang="scss">
  .signIn-form {
    .sigIn-title.ivu-form-item {
      margin-bottom: 10px;
      text-align: left;
      .sigIn-title-text {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .ivu-input-group-prepend {
      font-size: 14px;
    }
    .password-input {
      .ivu-input-group-prepend {
        width: 76px;
      }
    }
    .mobile-input {
      .ivu-input-group-prepend {
        width: 76px;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        .ivu-select-selected-value {
          font-size: 14px;
          padding-left: 0;
          text-align: left;
        }
      }
    }
    .smsCode-input {
      .ivu-input-group-prepend {
        width: 76px;
      }
      .smsCode-btn {
        font-size: 14px;
        color: #505050;
        background: #fff;
        padding: 0;
        width: 100%;
      }
    }
    .self-btn {
      width: 176px;
    }
    .f-pwd {
      line-height: 40px;
    }
  }
</style>
<template>
  <Form class="signIn-form" ref="signInLoginForm" :model="signInForm" :rules="signInRules" @keydown.enter.native="handleSignInSubmit">
    <FormItem class="sigIn-title"><span class="sigIn-title-text">注册账号</span></FormItem>
    <FormItem prop="password" class="password-input">
      <Input v-model="signInForm.password">
        <span slot="prepend">
          <span class="vm">确认密码</span>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="mobile" class="mobile-input">
      <Input v-model="signInForm.mobile" placeholder="11位手机号">
        <Select v-model="signInForm.selectMobileCode" slot="prepend">
          <Option value="+86">+86</Option>
          <Option value="+886">+886</Option>
          <Option value="+852">+852</Option>
          <Option value="+853">+853</Option>
        </Select>
      </Input>
    </FormItem>
    <FormItem prop="smsCode" class="smsCode-input">
      <Row>
        <Col span="17">
          <Input type="text" v-model="signInForm.smsCode" placeholder="">
            <span slot="prepend">
              <span class="vm">输入验证码</span>
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
    <FormItem>
      <Button class="pull-left self-btn" @click="handleSignInSubmit" type="primary">注册</Button>
      <span class="pull-right f-pwd" @click="handleEvent('LOGIN')">使用已有的医道账户登录</span>
      <span class="clear"></span>
    </FormItem>
  </Form>
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
  name: 'SignInForm',
  props: {
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
      signInForm: {
        password: '',
        mobile: '',
        selectMobileCode: '+86',
        smsCode: ''
      }
    }
  },
  computed: {
    signInRules() {
      return {
        password: this.passwordRules,
        mobile: this.mobileRules,
        smsCode: this.smsCodeRules
      }
    }
  },
  methods: {
    getSmsCode() { // 获取验证码
      const { mobile } = this.signInForm
      this.$refs.signInLoginForm.validateField('mobile')
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
        case 'LOGIN': {
          // 显示登录form
          this.$emit('bindEvent', { type: 'LOGIN' })
          break
        }
      }
    },
    handleSignInSubmit() {
      this.$refs.signInLoginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            type: 'SIGNIN',
            data: {
              userName: this.signInForm.userName,
              password: this.signInForm.password
            }
          })
        }
      })
    }
  }
}
</script>
