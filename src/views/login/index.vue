<template>
  <div class="login">

    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏 -->

<!-- 使用vee-validate  验证插件的使用规则 -->
<!-- 1使用ValidationObserver 把需要校验的整个表单包起来 -->
<!-- 2使用ValidationProvider  把需要校验的整个表单包起来 -->
<!-- 3通过validation provider配置具体的校验规则 -->
      <!-- name  配置验证字段的名称 -->
      <!-- rules  验证规则    多个规则使用  |   分割    v-slot="{errors}"  用来接受错误消息 -->
    <!-- 表单 -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required | mobile" >
           <van-field
           v-model="user.mobile"
            clearable
            placeholder="请输入手机号">
           </van-field>

           <!-- 获取验证失败的错误消息 -->
           <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>
      <ValidationProvider  name="验证码" rules="required | code">
      <van-field
      v-model="user.code"

       placeholder="请输入验证码">
      <van-count-down
      v-if="isCountDownShow"
      slot="button"
      :time="1000*60"
      format=" ss s"
      @finish="isCountDownShow=false"
       />

      <van-button
      v-else
      slot="button"
      size="small"
      type="primary"
      @click="onSendSmsCode ">
      发送验证码
      </van-button>
      </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <!-- /表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->
  </div>
</template>

<script>

import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    async onLogin () {
    //  获取表单数据
      const user = this.user

      // 表单验证
      const success = await this.$refs.form.validate()
      // 验证失败 提示错误消息  停止表单提交
      if (!success) {
        // 这个办法用俩个   还有一个是用if 判断
        setTimeout(() => {
          const errors = this.$refs.form.errors

          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              // 找到第一个有错误的  给出提示   停止循环
              return
            }
          }
        }, 100)
        return
      }

      // 表单验证通过  提示loading
      this.$toast.loading({
        duration: 0, // 持续时间  0是不停止
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 请求提交
      try {
        const res = await login(user)

        // 将登录状态存储到本地
        this.$toast.commit('setUser', res.data.data)

        // 提示登录成功
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败, 手机号或验证码错误')
      }
    },
    async onSendSmsCode () {
      // 获取手机号
      const { mobile } = this.user
      // 验证手机号是否有效
      const validateResult = await validate(mobile, 'required | mobile', {
        name: '手机号'
      })

      // 验证失败 提示错误消息 停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      try {
        // 显示倒计时
        this.isCountDownShow = true

        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)

        // 发送失败  关闭倒计时
        this.isCountDownShow = false

        // 到http状态码为429  提示用户不要频繁操作
        if (err.response.status === 429) {
          this.$toast('请勿频繁操作')
          return
        }
        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style lang='less' scoped >
  .login {
    .login-btn-box {
      padding: 20px;
       .van-button {
      width: 100%;

    }
  }

  }
</style>
