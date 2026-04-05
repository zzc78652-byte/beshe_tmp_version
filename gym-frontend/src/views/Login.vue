<template>
  <div class="login-index" :style="backgroundDiv">
    
    <el-form :model="ruleForm" :rules="rules"
             status-icon
             ref="ruleForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">

      <div class="title">
        健身房管理系统
      </div>

      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm.adminAccount"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm.adminPassword"
                  auto-complete="off"
                  placeholder="密码"
                  @keyup.enter.native="submitForm"
        ></el-input>
      </el-form-item>

      <div style="margin: 20px 0">
        <el-radio-group v-model="identity" size="mini">
          <el-radio label="1" >会员登录</el-radio>
          <el-radio label="2" >管理员登录</el-radio>
        </el-radio-group>
      </div>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { getMemberPassword } from "@/api/allApi";

export default {
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("@/assets/login.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // 改为 cover 确保图片不拉伸且铺满
        backgroundPosition: "center" // 背景图片居中显示
      },
      identity: '1',
      ruleForm: {
        adminAccount: '',
        adminPassword: ''
      },
      rules: {
        adminAccount: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        adminPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      if (this.identity === "2") {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let _this = this
            // 建议：如果论文里说是 POST，这里最好也改成 axios.post
            axios.get('http://localhost:9090/getAdminPassword', { params: _this.ruleForm }).then(function (response) {
              if (response.data != null) {
                window.localStorage.setItem('access-admin', JSON.stringify(response.data))
                _this.$router.replace({ path: '/layout' })
              }
            })
          }
        });
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let _this = this
            getMemberPassword({
              memberPhone: _this.ruleForm.adminAccount,
              memberPassword: _this.ruleForm.adminPassword
            }).then(res => {
              if (res.data.code === 200) {
                window.localStorage.setItem('access-member', JSON.stringify(res.data))
                _this.$router.replace({ path: '/memberLayout' })
              } else {
                this.$message.error('账号或密码错误');
              }
            }).catch(err => { console.log(err.message) })
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.login-index {
  /* 关键修改：height 改为 100vh 确保占满整个浏览器高度 */
  height: 100vh;
  width: 100%;
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: #f5f5f5;
  position: fixed; /* 固定定位，防止滚动条导致白边 */
  top: 0;
  left: 0;
}

.login-page {
  border-radius: 8px;
  width: 350px;
  padding: 35px 35px 15px;
  background: rgba(255, 255, 255, 0.95); /* 稍微加点透明度 */
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  z-index: 10;
}

.title {
  margin-bottom: 30px;
  color: #ee6c0f;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>