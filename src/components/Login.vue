<template>
    <div class="login_container">
      <div class="login_box">
        <!--头像区域-->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="头像">
        </div>
        <!--登录表单区域-->
        <el-form ref="loginFormRef" :model="form"  :rules="loginFormRules" label-width="0px" class="login_form">
          <!--用户名-->
          <el-form-item prop="username">
            <el-input v-model="form.username"  prefix-icon="el-icon-user"  ></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock" ></el-input>
          </el-form-item>
          <!--按钮区-->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">提交</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
          return {
            form :{
              username:'test',
              password:'123456'
            },
            loginFormRules:{
              username:[
                { required:true,message:"请输入用户名",trigger:"blur"}
              ],
              password:[
                { required:true,message:"请输入密码",trigger:"blur"},
                { mix:6,max:12,message: "长度在6-12位之间",trigger:"blur"}
              ]
            }
          }
      },
      methods:{
        resetLoginForm(){
          this.$refs.loginFormRef.resetFields();
        },
        login(){
          var param = new URLSearchParams();
          param.append("username",this.form.username);
          param.append("password",this.form.password);

          let pa = this.$qs.stringify({
            'username':this.form.username,
            'password':this.form.password
          })
          this.$refs.loginFormRef.validate(async valid => {
              if (!valid) return;
              const {data:res} =await this.$http.post('admin/login',param);
              console.log(res)
              if (res.result !== '登录成功') return this.$message.error(res.result);
              this.$message.success(res.result);
              window.sessionStorage.setItem("tokenHead",res.tokenHead);
              window.sessionStorage.setItem("token",res.token);
              this.$router.push('/home');
          });

        }
      }
    };
</script>

<style lang="less" scoped >
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

  .login_box{
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
