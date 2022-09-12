<template>
  <div>
    <el-card shadow="never">
      <div class="box">
        <!-- 左边选择框 -->
        <div class="chooseBox">
          <div>预测数据选</div>
          <el-button>测试</el-button>
        </div>
        <!-- 右边展示 -->
        <div class="resBox">
          <div>预测结果展示</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.box {
  display: flex;
}
.chooseBox {
  width: 30%;
}
.resBox {
  margin-left: 1%;
  width: 69%;
}
</style>
