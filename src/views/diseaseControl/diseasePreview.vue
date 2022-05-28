<template>
  <div>
      <el-card shadow="never" style="margin-bottom: 15px">
        <div class="search-card">
          <div class="search-input">
            <div style="flex-shrink: 0">疾病名称：</div>
            <el-input size="small" style="margin-left: 10px" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>疾病部位:</span>
            <el-select size="small" style="margin-left: 10px" placeholder="请选择">
              <el-option v-for="item in partOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div>
            <span>疾病类型:</span>
            <el-select size="small" style="margin-left: 10px" placeholder="请选择">
              <el-option v-for="item in partOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div>
            <el-button type="search" size="small">查询</el-button>
          </div>
        </div>
      </el-card>
      <el-card shadow="never">
        <el-table :data="tableData" height="250" border style="width: 100%; cursor: pointer" @row-click="openedDetails">
          <el-table-column prop="date" label="序号" width="180"> </el-table-column>
          <el-table-column prop="name" label="疾病名称" width="180"> </el-table-column>
          <el-table-column prop="address" label="疾病类型"> </el-table-column>
          <el-table-column prop="address" label="病因"> </el-table-column>
          <el-table-column prop="address" label="疾病表现"> </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      partOptions: [
        { value: '根', label: '根' },
        { value: '茎', label: '茎' },
        { value: '叶', label: '叶' },
        { value: '果实', label: '果实' },
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    }
  },
  methods: {
    openedDetails(row) {
      console.log('点击', row)
     this.$router.push('/diseaseDetails')
    },
  },
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