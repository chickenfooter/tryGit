<template>
  <div>
    <el-card shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="种植技术" name="first"> <Planting></Planting></el-tab-pane>
        <el-tab-pane label="专家" name="second">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <div>
                  <div class="header">
                    <!-- 照片 -->
                    <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <div class="title">
                      <div class="name">刘双印</div>
                      <p>擅长领域：教授，博士生导师，博士</p>
                      <p>信息科学与技术学院院长，仲恺智慧农业创新研究院执行院长</p>
                    </div>
                    <!-- 简介 -->
                  </div>
                  <div class="actions"></div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <div>
                  <div class="header">
                    <!-- 照片 -->
                    <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <div class="title">
                      <div class="name">刘双印</div>
                      <p>擅长领域：教授，博士生导师，博士</p>
                      <p>信息科学与技术学院院长，仲恺智慧农业创新研究院执行院长</p>
                    </div>
                    <!-- 简介 -->
                  </div>
                  <div class="actions"></div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <div>
                  <div class="header">
                    <!-- 照片 -->
                    <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <div class="title">
                      <div class="name">刘双印</div>
                      <p>擅长领域：教授，博士生导师，博士</p>
                      <p>信息科学与技术学院院长，仲恺智慧农业创新研究院执行院长</p>
                    </div>
                    <!-- 简介 -->
                  </div>
                  <div class="actions"></div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="问答" name="third">问答</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Planting from './planting.vue'
export default {
  components: {
    Planting,
  },
  data() {
    return {
      activeName: 'first',
    }
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
}
</script>

<style scoped>
::v-deep .el-tabs__item.is-top {
  font-size: 20px;
  font-weight: 500;
  padding-right: 30px;
  padding-left: 40px;
}
.header {
  display: flex;
}
.header img {
  margin-left: 10px;
}
.title {
  margin-left: 10px;
}
.name {
  font-size: 1.3em;
  color: black;
  margin-top: -10px;
}
.title p {
  color: rgb(151, 151, 151);
  margin-top: 4px;
}
</style>