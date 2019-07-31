<template>

  <div class="container">
    <div class="big_box">
      <div id="content_box">
        <div class="login_box">
          <form class="el-form demo-ruleForm login-container el-form--label-left">
            <h3 class="title">登录</h3>
            <p class="login-rule">任意账号和6~12位密码登陆</p>
            <el-form :model="form" status-icon ref="formPass" :rules="rules">
              <div class="el-form-item input_box is-required">
                <div class="el-form-item__content" style="margin-left: 0px;">

                  <div class="el-login-input">
                    <img src="../assets/login_user.png" alt="" class="input_icon">
                    <el-form-item>
                      <el-input v-model="form.username" auto-complete="off" placeholder="账号" class="left_padding_input"></el-input>
                    </el-form-item>
                    <!-- <input v-model="form.username" type="text" id="username" placeholder="账号" autocomplete="off" class="el-input__inner"> -->
                  </div>
                </div>
              </div>
              <div class="el-form-item is-required">
                <div class="el-form-item__content" style="margin-left: 0px;">
                  <div class="el-login-input">
                    <img src="../assets/login_pass.png" alt="" class="input_icon">
                    <el-form-item>
                      <el-input @keyup.enter.native="submitForm" v-model="form.password" type="password" auto-complete="off" placeholder="密码" class="left_padding_input"></el-input>
                    </el-form-item>
                    <!-- <input v-model="form.password" type="password" id="password" placeholder="密码" autocomplete="off" class="el-input__inner"> -->

                  </div>
                </div>
              </div>
            </el-form>
            <div class="el-form-item" style="width: 100%;margin-top:20px;margin-bottom:10px;">
              <div class="el-form-item__content btn_box" style="margin-left: 0px;">
                <el-button type="button" :loading="loading" @click.stop="submitForm" class="el-button el-button--primary" style="width: 100%;">

                  <span>登录</span>
                </el-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      bg_hei: 0,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    document.title = "vue-admin"; // 是否显示提现审核弹框(不合理,'/CommissionWithdrawal')
  },
  mounted() {
    var that = this;
    this.bg_hei = document.body.offsetHeight - 100;
    window.onresize = function temp() {
      that.bg_hei = (979 * document.body.offsetWidth) / 1918;
    };

    //调用接口
    this.$request({
      url:this.$api.login,
      data:{ userName: 123 }
    }).then(res=>{
      console.log('res值为',res);
    })
  },
  methods: {
    handSearch() {
      this.login();
    },
    submitForm() {
      this.$refs.formPass.validate(valid => {
        if (valid) {
          //存贮账号信息
          // login
          //   .loginPost("/api/login", {
          //     userName: this.form.username,
          //     password: this.form.password
          //   })
          //   .then(data => {
          //     console.log("data值为", data);
          //     sessionStorage.setItem("userName", this.form.username);
          //     this.$message.success("登陆成功");
          //     this.$router.push({ path: "/" });
          //   })
          //   .catch(data=>{
          //     this.$message.warn("账号已存在!");
          //     console.log("错误data值为", data);
          //   })
              this.$router.push({ path: "/" });
        } else {
          this.$message.warn("登陆失败,请检查");
          return false;
        }
      });
    },
    // 登陆后查询导航等信息
    login: function() {}
  }
};
</script>

<style scoped>
.login-rule {
  text-align: left;
  margin: 6px 0;
  font-size: 12px;
  color: gray;
}

.input_icon {
  position: absolute;
  top: 10px;
  left: 13px;
  width: 18px;
  z-index: 1;
}
.title {
  text-align: left;
  font-size: 20px;
  color: #4a4a4a;
  padding: 20px 0;
  font-weight: 500;
  margin: 0;
}

.login_box {
  position: absolute;
  top: -100px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 20.6%;
  height: 28.4%;
  min-width: 370px;
  margin: auto;
  margin-right: 21%;
}

.login-container {
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 0 40px;
  background: #fff;
  border: 1px solid #eaeaea;
  padding-bottom: 20px;
  /*box-shadow: 0 0 25px #cac6c6;*/
}
#content_box {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/login.jpg") no-repeat center center;
  background-size: 100% 100%;
}
.input_box {
  margin-bottom: 20px;
}
</style>
