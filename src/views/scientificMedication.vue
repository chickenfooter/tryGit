<template>
    <div>
       <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">技术：</div>
          <el-input size="small" style="margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>xxx:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择">
            <el-option v-for="item in partOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div>
          <span>xxx:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择">
            <el-option v-for="item in partOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="search" size="small">查询</el-button>
        </div>
      </div>
    </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.search-card {
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
}
.search-input {
  display: flex;
  align-items: center;
}
.el-button--search {
  background: rgb(8, 46, 83);
  color: #fff;
}
</style>
