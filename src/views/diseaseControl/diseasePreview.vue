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
      <el-table :data="tableData"  max-height="510" border style="width: 100%; cursor: pointer" @row-click="openedDetails">
        <el-table-column prop="date" label="序号" width="180"> </el-table-column>
        <el-table-column prop="diseaseChineseName" label="疾病名称" width="180"> </el-table-column>
        <el-table-column prop="disasterTypeName" label="疾病类型"> </el-table-column>
        <el-table-column prop="diseaseIntroduce" label="疾病简介"> </el-table-column>
        <el-table-column prop="diseaseSymptom" label="疾病表现"> </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[10,14,16,20]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      total: 10,
      flag: true,
      partOptions: [
        { value: '根', label: '根' },
        { value: '茎', label: '茎' },
        { value: '叶', label: '叶' },
        { value: '果实', label: '果实' },
      ],
      tableData: [],
    }
  },
  created() {
    this.getDiseaseInfo()
  },
  methods: {
    // 分页获取疾病数据
    async getDiseaseInfo() {
      const {data:res} = await this.$http.get(`/dev2/disease-information/browse?pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
      console.log(res)
      if(res.code === 0) {
        this.tableData = res.data.browse.records
        this.total = res.data.browse.total
      }
    },
    openedDetails(row) {
      console.log('点击', row)
      this.$router.push('/diseaseDetails')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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