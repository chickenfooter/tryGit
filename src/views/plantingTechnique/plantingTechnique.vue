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
                    <!-- <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar> -->
                    <div class="title">
                      <div class="name">林进添</div>
                      <p>简介：博士，教授，博士生导师，广东省优秀教师，仲恺农业工程学院教授。</p>
                      <p>研究领域：害虫防控与抗药性治理的教学与科研。</p>
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
                    <!-- <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar> -->
                    <div class="title">
                      <div class="name">黄江华</div>
                     <p>简介：博士、教授、硕士生导师，广东省“千百十工程”省级培养对象，仲恺农业工程学院教授。</p>
                      <p>研究领域：植物病理学、植物保护学以及入侵生物学的教学与科研。</p>
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
                    <!-- <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar> -->
                    <div class="title">
                      <div class="name">宾淑英</div>
                      <p>简介：教授、硕士导师，仲恺农业工程学院教授。</p>
                      <p>研究领域：农业昆虫与害虫防治、农药学。</p>
                    </div>
                    <!-- 简介 -->
                  </div>
                  <div class="actions"></div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
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
  min-height: 90px;
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