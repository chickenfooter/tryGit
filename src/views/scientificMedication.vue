<template>
    <div>
       <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">疾病名称：</div>
          <el-input size="small" style="margin-left: 10px" v-model="searchInfo.name" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <el-button size="small" @click="newSearchInfo()">重置</el-button>
          <el-button type="search" size="small" @click="toSearch()">查询</el-button>
        </div>
      </div>
    </el-card>
         <el-table  :data="picAndInfo" max-height="510" border style="width: 100%; cursor: pointer" @row-click="toDetails" >
        <!-- <el-table-column prop="date" label="序号" width="80"> </el-table-column> -->
        <el-table-column prop="diseaseName" label="疾病名称" > </el-table-column>
        <el-table-column prop="type" label="杀虫剂" > </el-table-column>
      </el-table>
      <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
<<<<<<< HEAD
      width="60%"
=======
      width="45%"
>>>>>>> be21fd4648b4629552058f5657293f09932c71b0
      :before-close="handleClose"
    >
      <table class="tableInfo" :model="addForm" id="printTest">
          <thead></thead>
          <tbody>
            <tr>
              <td class="tdName">英文名</td>
              <br>
              <td class="tdInfo">{{ addForm.englishName }}</td>
            </tr>
            <tr>
              <td class="tdName">杀虫剂名称</td>
              <br>
              <td class="tdInfo">{{ addForm.insecticideName }}</td>
            </tr>
            <tr>
              <td class="tdName">活性成分</td>
              <br>
              <td class="tdInfo">{{ addForm.activeConstituent }}</td>
            </tr>
            <tr>
              <td class="tdName">证书编号</td>
              <br>
              <td class="tdInfo">{{ addForm.certificateNumber }}</td>
            </tr>
            <tr>
              <td class="tdName">介绍</td>
              <br>
              <td class="tdInfo">{{ addForm.instruction }}</td>
            </tr>
            <tr>
              <td class="tdName">紧急处理</td>
              <br>
              <td class="tdInfo">{{ addForm.emergencyTreatment }}</td>
            </tr>
            <tr>
              <td class="tdName">备注</td>
              <br>
              <td class="tdInfo">{{ addForm.remarks }}</td>
            </tr>
          </tbody>
        </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data(){
    return {
       dialogVisible: false,
        addForm: {
        },
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 40,
      },
      total: 10,
      flag: true,
      searchInfo: {
        name: '柑橘黄龙病',
        part: '',
        disease: '',
      },
      tableData: [],
      picAndInfo: [],
      loading: true,
    }
  },
  created() {
    // this.getDiseaseInfo()
    // this.getpicAndInfo()
  },
  mounted(){
    this.getpicAndInfo()
  },

  methods:{
    toDetails(row) {
      // this.dialogVisible = true
      console.log(row,"列")
      this.addForm = row;
      this.dialogVisible = true
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      },
     // 查看详情
    openedDetails(row) {
      console.log('点击', row)
      // this.$router.push({ path: '/medication',query: { id: row.diseaseId }})

    },
    //详细信息
 async getpicAndInfo() {
      if (this.name === '柑桔黄龙病') {
        this.name = '柑橘黄龙病'
      }
      const { data: res } = await this.$http.get(`/orange_service/insecticide/getInsecticideInfo/{insecticideName}?diseaseName=${this.searchInfo.name}`)
      console.log(res,"农药11")
       console.log(this.searchInfo.name)
      if (res.code === 0) {
        this.picAndInfo = res.data.insecticideInfoVos
        this.addForm = res.data.insecticideInfoVos[0]

      }
      console.log(this.picAndInfo)
      console.log(this.addForm)
      // console.log(JSON.parse(this.picAndInfo));
    },
    // 查询
    async toSearch() {
      console.log(this.searchInfo, '查询数据')
      if (this.searchInfo.name === '' && this.searchInfo.part === '') {
        const { data: res } = await this.$http.get(`/dev2/disease-information/browseLike?disasterTypeId=${this.searchInfo.disease}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      } else if (this.searchInfo.name === '' && this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(`/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      } else if (this.searchInfo.part === '' && this.searchInfo.disease) {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      } else if (this.searchInfo.name === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&disasterTypeId=${this.searchInfo.disease}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      } else if (this.searchInfo.part === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?disasterTypeId=${this.searchInfo.disease}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      } else if (this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      } else {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&disasterTypeId=${this.searchInfo.disease}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success("查询成功")
        }
      }
    },
  }
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
.tableInfo {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
.tableInfo td,
.tableInfo th {
  border: 1px solid #333;
  color: #666;
  height: 60px;
}
.tdName {
  font-size: 18px;
  width: 100px;
  background-color: #cad9ea;
}
.tdInfo {
  font-size: 16px;
}
</style>
