<template>

  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <!--侧边区域-->
      <el-aside :width="isCollaspe ? '64px':'200px' ">
        <div class="toggle-button" @click="toggeleCollapse">|||</div>
        <!--侧边栏菜单区-->
        <el-menu background-color="#373d41" text-color="#fff"
                 active-text-color="#409EFF":unique-opened="true"
                 :collapse="isCollaspe" :collapse-transition="false">
          <el-submenu :index="item.id+''" v-for="item in menulist"
                      :key="item.id" v-if="item.type === 1" >
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <!--文本-->
              <span>{{item.name}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="childen.id+''" v-for="childen in menulist" :key="childen.id" v-if="childen.type === 2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{childen.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>

      </el-aside>
      <!--主体区域-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      data() {
        return {
          //左侧菜单数据
          menulist: [],
          iconList: {
            '2':'el-icon-shopping-bag-1',
          },
          isCollaspe:false,
        }
      },
      created() {
        this.getMenuList();
      },
      methods:{
          loginout:function () {
              window.sessionStorage.clear();
              this.$router.push('/login');
          },
       async getMenuList () {
           const {data : res } = await this.$http.get('http://localhost:8889/umResource');
           this.menulist = res;
        },
        toggeleCollapse () {
            this.isCollaspe = !this.isCollaspe;
        }
      }
    }
</script>

<style lang="less" scoped>
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
  .el-aside{
    background-color: #373d41;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #dddddd;
  }
  .home-container {
    height: 100%;
  }

  .toggle-button {
    background-color: #2b4b6b;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

</style>
