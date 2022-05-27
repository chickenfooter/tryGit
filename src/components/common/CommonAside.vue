<template>
    <el-menu background-color="rgb(11, 23, 64)" text-color="rgb(166, 181, 181)" active-text-color="#fff"
    :default-active="String(activeNav)" :collapse="isCollapse" :unique-opened="true" class="el-menu-vertical-demo">
    <!-- 没有二级菜单的导航栏 -->
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 有二级的导航栏 -->
    <el-submenu :index="item.path" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
        @click="clickMenu(subItem)" >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import MenuData from './menu_data.js'
export default {
  data() {
    return {
      asideMenu: MenuData.get_menu_data()
    }
  },
  computed: {
    // 判断导航栏是否有子节点
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      var flag = JSON.parse(localStorage.getItem('userForm')).flag
      // 权限管理，当不是队长时，不显示系统管理菜单
      if(!flag) {
        this.asideMenu = this.asideMenu.splice(0,7)
      }
      return this.asideMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.menu.isCollapse
    },
    // 设置当前激活的导航
    activeNav() {
      return this.$route.path
    }
  },
  methods: {
    // 点击切换路由
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
      console.log(item.name)
    }
  }
}
</script>
<style lang="scss">
  .el-menu {
    height: 100%;
    border: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
