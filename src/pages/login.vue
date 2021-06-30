<template>
  <div id="login_index">
    <div id="title">
      <span>用户登录</span>
    </div>
    <el-form :model="userInfo" :rules="rules" ref="loginForm">
      <div class="login_info">
        <span class="text">登录账号:</span>
      </div>
      <el-form-item prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <div class="login_info">
        <span class="text">登录密码:</span>
      </div>
      <el-form-item prop="password">
        <el-input v-model="userInfo.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:200px" type="goon" @click="login">登&nbsp;&nbsp;录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let user = {
            userId: this.userInfo.name,
            password: this.$md5(this.userInfo.password)
          }
          this.$api
            .userLogin(user)
            .then((res) => {
              let eToken = res.data.data.token.token
              localStorage.setItem('Token',eToken)
              this.$router.push('/push')
            }).catch((err)=>{
              this.$message.error('登录失败，请联系管理员')
            })
        }
      });
    },
  },
};
</script>

<style scoped>
#login_index {
  width: 352px;
  height: 402px;
  margin: 0 auto;
  overflow: auto;
}
#title {
  font-size: 24px;
  color: #a25100;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
}
.login_info {
  height: 30px;
  line-height: 30px;
  display: flex;
}
.text {
  font-size: 15px;
  color: #a25100;
  font-weight: bold;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #db8a0f;
  border: none;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #db8a0f;
  border: none;
}
.el-button--goon {
  background-color: #a25100;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
</style>