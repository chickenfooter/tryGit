<template>
    <div>
      <el-card shadow="never" style="margin-bottom: 15px">
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="原料介绍">原料介绍</el-tab-pane>
    <el-tab-pane label="食物相克">食物相克</el-tab-pane>
    <el-tab-pane label="营养分析">营养分析</el-tab-pane>
    <el-tab-pane label="适用人群">适用人群</el-tab-pane>
     <el-tab-pane label="相关内容">相关内容</el-tab-pane>
  </el-tabs>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
      return {
        tabPosition: 'left'
      };
    }
}
</script>
